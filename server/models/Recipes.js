const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    header: {
        type: String,
        required: false,
        default: null
    }, 
    ingredient: {
        type: String,
        required: true
    }
})

const timeSchema = new mongoose.Schema({
    hours: {
        type: Number,
        required: true,
        min: 0
    },
    minutes: {
        type: Number,
        required: true,
        min: 0,
        max: 59
    }
});

const RecipeSchema = new mongoose.Schema({
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    recipeImg: {
        type: String,
        required: true
    },
    ingredients: [ingredientSchema],
    instructions: [{ type: String, required: true}],
    servings: {
        type: String,
        required: true
    }, 
    cookTime: timeSchema,
    prepTime: timeSchema,
    cuisine: {
        type: String,
        required: true
    },
    collection: {
        type: String,
        required: true
    },
    mainIngredient: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const RecipeModel = mongoose.model("recipes", RecipeSchema)

module.exports = RecipeModel;