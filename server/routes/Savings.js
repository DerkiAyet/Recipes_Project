const express = require('express');
const router = express.Router();

const SavingModel = require('../models/Savings');
const { authMiddleware } = require('../midlewares/AuthMiddleware');

router.post('/saveRecipe', authMiddleware, async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    try {

        const savingExist = await SavingModel.findOne({
            userOwner: userId,
            recipeId: recipeId
        })

        if (savingExist) {

            await SavingModel.deleteOne({
                userOwner: userId,
                recipeId: recipeId
            });

            return res.status(200).json({
                messageDelete: "recipe unsaved"
            })

        } else {

            const newSaving = new SavingModel({
                userOwner: userId,
                recipeId: recipeId
            })

            await newSaving.save();

            return res.status(200).json({
                messageCreate: "recipe saved",
                newSaving : newSaving
            })
        }

    } catch (error) {

        return res.status(500).json({   // it's better to put always return before res to avoid such type of silly error
            error: "Internal server error"
        })

    }
})

router.get('/savedRecipes', authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    const listOfSavings = await SavingModel.find({
        userOwner: userId
    }).select('recipeId')

    const savedRecipeIds = listOfSavings.map((save) => save.recipeId);/* 3lh dirna hadi pcq evidement list lwla t5rj kima
    hak [ {}, {}, {} ] w 7na 5ssna array ta3 strings */ 

    try {

        const listOfRecipes = await SavingModel.aggregate([
            {
                $match: {
                    recipeId: { $in: savedRecipeIds } /* ma kounach mnjmin ndirou (userOwner: userId) direct pcq ki
                    njibouh min middleware wla req.params ykoun de type string mchi objectId */
                }
            },
            {
                $lookup: {
                    from: 'recipes',
                    localField: 'recipeId',
                    foreignField: '_id',
                    as: 'recipeDetails'
                }
            },
            {
                $unwind: '$recipeDetails' /* hna ya3ni y7t ga3 recipeDetails as un attribut bi nafss nom w ykoun fih ga3
                les infos ta3 recipe bs7 7na ghadi ngl3ouhm mb3d*/
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: 'recipeId',
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
                    _id: 0,
                    recipeId: 1,
                    'recipeDetails.title': 1,
                    'recipeDetails.mainIngredient' : 1,
                    'recipeDetails.recipeImg': 1,
                    ratingAvg: 1,
                    ratingsCount: 1
                }
            },
        ]);

        return res.status(200).json(listOfRecipes)

    } catch (error) {

        return res.status(500).json({
            error: "Internal server error"
        })

    }
})

module.exports = router