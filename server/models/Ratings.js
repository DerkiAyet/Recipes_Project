const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
})

const RatingModel = mongoose.model("ratings", RatingSchema);

module.exports = RatingModel;