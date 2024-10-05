const express = require('express');
const router = express.Router();

const RatingModel = require('../models/Ratings');
const { authMiddleware } = require('../midlewares/AuthMiddleware');

router.get('/userRatings', authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {
        const listOfRatings = await RatingModel.find({ userOwner: userId }).select("recipeId rating");

        res.status(200).json(listOfRatings);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
})

router.post('/addRating/:recipeId', authMiddleware, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.userId;
    const { rating } = req.body;

    const ratingExist = await RatingModel.findOne({
        userOwner: userId,
        recipeId: recipeId
    })

    if (ratingExist) {
        ratingExist.rating = rating;

        try {

            await ratingExist.save();

            const averageRatingResult = await RatingModel.aggregate([
                { $match: { recipeId: recipeId } },
                { $group: { _id: null, averageRating: { $avg: '$rating' } } }
            ]);
    
            const averageRating = averageRatingResult.length > 0 ? averageRatingResult[0].averageRating : 0;

            return res.status(201).json({
                modify: "success",
                newAvg: averageRating
            })

        } catch (error) {

            res.status(500).json({
                error: "Internal server error"
            })

        }
    } else {
        const newRating = new RatingModel({
            userOwner: userId,
            recipeId: recipeId,
            rating: rating
        })

        try {

            await newRating.save();
            res.status(201).json({
                added: "success"
            })

        } catch (error) {

            res.status(500).json({
                error: "Internal server error"
            })

        }
    }
})

router.delete('/deleteRating/:recipeId', authMiddleware, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.userId;

    try {

        const ratingExist = await RatingModel.findOne({
            userOwner: userId,
            recipeId: recipeId
        })

        if (!ratingExist) {
            return res.status(404).json({ error: "Rating not found" });
        }

        await RatingModel.deleteOne({
            userOwner: userId,
            recipeId: recipeId
        })

        res.status(200).json({
            success: "Item delted with success"
        })

    } catch (error) {

        res.status(500).json({
            error: "Internal server error"
        })

    }
})

module.exports = router;