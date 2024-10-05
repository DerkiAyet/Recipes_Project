require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path')

app.use(express.json())
app.use(cors({
   origin: ["http://localhost:3000"],
   credentials: true
}))
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const usersRouter = require('./routes/Users');
app.use('/auth', usersRouter)

const recipesRouter = require('./routes/Recipes');
app.use('/recipes', recipesRouter);

const ratingsRouter = require('./routes/Ratings');
app.use('/ratings', ratingsRouter);

const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter)

const savingsRouter = require('./routes/Savings')
app.use('/savings', savingsRouter)

mongoose.connect(
    `mongodb+srv://halimaderki399:${process.env.MONGODB_PASSWORD}@cluster0.hvaoj.mongodb.net/recipes_bd?retryWrites=true&w=majority&appName=Cluster0`
);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server runs on port ${process.env.PORT || 3001}`);
})