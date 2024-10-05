const express = require('express');
const router = express.Router();

const RecipeModel = require('../models/Recipes');
const CommentModel = require('../models/Comments');
const RatingModel = require('../models/Ratings');
const SavingModel = require('../models/Savings');

const { authMiddleware } = require('../midlewares/AuthMiddleware');

const mongoose = require('mongoose')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/recipes/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    try {

        const listOfRecipes = await RecipeModel.aggregate([
            {
                $match: {}
            },
            {
                $project: {
                    userOwner: 1,//we keep the userOwner for the next lookup
                    _id: 1,
                    title: 1,
                    recipeImg: 1,
                    cuisine: 1,
                    collection:1,
                    mainIngredient: 1
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userOwner',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $addFields: {
                    userFullName: { $arrayElemAt: ['$user.fullName', 0] },
                    userImg: { $arrayElemAt: ['$user.userImg', 0] }  // Extract the first (and only) user's full name because the lookup always extract it as array
                }
            },
            {
                $project: {
                    user: 0,
                    userOwner: 0//now we remove after we used it in this lookup
                }
            },
            {
                $lookup: {          //-------------le responsable de jointure
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'recipeId',
                    as: 'recipeRatings'
                }
            },
            {
                $addFields: {         //----------ajouter des nouveaux attributs
                    ratingAvg: {     //le nom de attribut
                        $cond: {    //----------condition
                            if: { $gt: [{ $size: '$recipeRatings' }, 0] }, //size(recipeRating)>0?
                            then: { $avg: '$recipeRatings.rating' },
                            else: 0
                        }
                    },
                    ratingsCount: { $size: '$recipeRatings' }
                }
            },
            {
                $project: {
                    recipeRatings: 0
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'recipeId',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    commentsCount: { $size: '$comments' }
                }
            },
            {
                $project: {
                    comments: 0
                }
            }
        ])

        res.status(200).json(listOfRecipes)

    } catch (error) {

        res.status(500).json({
            error: "Internal server error"
        })

    }
})

router.post('/addRecipe', authMiddleware, upload.single('recipeImg'), async (req, res) => {

    const userId = req.user.userId;

    const {
        title,
        description,
        ingredients,
        instructions,
        servings,
        cookTime,
        prepTime,
        cuisine,
        collection,
        mainIngredient,
    } = req.body;

    const recipeImg = req.file ? `recipes/${req.file.filename}` : null;

    const parsedIngredients = JSON.parse(ingredients);

    const parsedInstructions = instructions ? JSON.parse(instructions) : [];

    const newRecipe = new RecipeModel({
        userOwner: userId,
        title,
        description,
        recipeImg,
        ingredients: parsedIngredients,
        instructions: parsedInstructions,
        servings,
        cookTime: JSON.parse(cookTime),
        prepTime: JSON.parse(prepTime),
        cuisine,
        collection,
        mainIngredient,
    });

    try {

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);

    } catch (error) {

        res.status(500).json({ error: "Error while saving the recipe" });

    }
});

router.get('/getUserRecipes', authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    const listOfRecipesIds = await RecipeModel.find({
        userOwner: userId
    }).select('_id')

    const recipeIds = listOfRecipesIds.map(recipe => recipe._id);/* 3lh dirna hadi pcq evidement list lwla t5rj kima
    hak [ {}, {}, {} ] w 7na 5ssna array ta3 strings nafss comment w 3awdt ktbth bach ma nnsach ^_^ */

    try {

        const listOfRecipes = await RecipeModel.aggregate([
            {
                $match: {
                    _id: { $in: recipeIds }/* ma kounach mnjmin ndirou (userOwner: userId) direct pcq ki
                    njibouh min middleware wla req.params ykoun de type string mchi objectId */
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    mainIngredient: 1,
                    recipeImg: 1
                }
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'recipeId',
                    as: 'ratings'
                }
            },
            {
                $addFields: {
                    ratingAvg: {
                        $cond: {
                            if: { $gt: [{ $size: '$ratings' }, 0] },
                            then: { $avg: '$ratings.rating' },
                            else: 0
                        }
                    },
                    ratingsCount: { $size: '$ratings' }
                }
            },
            {
                $project: {
                    ratings: 0
                }
            },
        ])

        res.status(200).json(listOfRecipes)

    } catch (error) {

        res.status(500).json({ error: "server error" });

    }
})

router.get('/getRecipe/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;

    try {

        const recipe = await RecipeModel.findById(recipeId).populate('userOwner', 'fullName').exec();

        const commentsCount = await CommentModel.countDocuments({ recipeId: recipeId });

        const ratingCount = await RatingModel.countDocuments({recipeId: recipeId});

        const averageRatingResult = await RatingModel.aggregate([
            { $match: { recipeId: recipe._id } },
            { $group: { _id: null, averageRating: { $avg: '$rating' } } } //grouper tous les ratings et calculer avg w nssimiw attribut averageRating
        ]);

        const averageRating = averageRatingResult.length > 0 ? averageRatingResult[0].averageRating : 0;//hna dymn aggregate ta3ti array

        const savingsCount = await SavingModel.countDocuments({recipeId: recipeId})

        return res.status(200).json({...recipe._doc, commentsCount,ratingCount, averageRating, savingsCount})

    } catch (error) {

        return res.status(500).json({ error: "server error" });

    }
})


module.exports = router;