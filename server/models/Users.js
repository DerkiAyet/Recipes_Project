const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    fullName: {
        type: String,
        required: false,
        default: "user full name"
    },
    userImg: {
        type: String,
        required: false,
        default: null  
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;