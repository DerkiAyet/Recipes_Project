const mongoose = require('mongoose');

const SavingSchema = new mongoose.Schema({
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipes",
        required: true
    }
})

const SavingModel = mongoose.model("savings", SavingSchema)

module.exports = SavingModel