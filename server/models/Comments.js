const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipes",
        required: true
    },
    commentText: {
        type: String,
        required: true
    }
})

const CommentModel = mongoose.model("comments", CommentSchema);

module.exports = CommentModel