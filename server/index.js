const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const UserModel = require('./models/Users')

app.use(express.json())
app.use(cors())

mongoose.connect(
    "mongodb+srv://halimaderki399:halima_mongo@cluster0.hvaoj.mongodb.net/mern_tutorial?retryWrites=true&w=majority&appName=Cluster0"
);

app.get('/', async (req, res) => {
    try {

        const result = await UserModel.find({});
        res.status(200).json(result);

    } catch (err) {

        res.status(400).json(err);

    }
});

app.post('/postUser', async (req, res) => {
    try {

        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(201).json(newUser)

    } catch (error) {

        res.status(500).json(error)

    }
})

app.listen(3001, () => {
    console.log("server runs on port 3001")
})