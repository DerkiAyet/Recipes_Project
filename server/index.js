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

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server runs on port ${process.env.PORT || 5000}`);
})
