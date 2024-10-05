const express = require('express');
const router = express.Router();

const CommentModel = require('../models/Comments');
const { authMiddleware } = require('../midlewares/AuthMiddleware');

router.get('/userComments', authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {

        const listOfCommentsIds = await CommentModel.distinct('_id', { userOwner: userId }); //the distnct in here help to get only the _id attribute

        res.status(200).json(listOfCommentsIds);
        
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
})

router.post('/addComment/:recipeId', authMiddleware, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.userId;
    const { commentText } = req.body;

    try {

        const newComment = await CommentModel({
            userOwner: userId,
            recipeId: recipeId,
            commentText: commentText
        })

        await newComment.save();

        res.status(201).json(newComment);

    } catch (error) {

        res.status(500).json({
            error: "Internal server error"
        })

    }
})

router.delete('/deleteComment/:recipeId', authMiddleware, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.userId;

    try {

        const commentExist = await CommentModel.findOne({
            userOwner: userId,
            recipeId: recipeId
        })

        if (!commentExist) {
            return res.status(400).json("comment doesn't exist")
        }

        await CommentModel.deleteOne({
            userOwner: userId,
            recipeId: recipeId
        })

        res.status(200).json({
            message: "comment deleted with success"
        })

    } catch (error) {

        res.status(500).json({
            error: "Internal server error"
        })

    }
})

router.get('/getRecipeComments/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;

    try {

        const recipeComments = await CommentModel.find({ recipeId: recipeId }).populate("userOwner", "fullName userImg").exec();

        return res.status(200).json(recipeComments)

    } catch (error) {

        return res.status(500).json({
            error: "Internal server error"
        })

    }
})

module.exports = router;