require('dotenv').config()
const express = require('express');
const UserModel = require('../models/Users')
const router = express.Router();
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('../midlewares/AuthMiddleware');

router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email: email });

        if (user) {
            return res.status(400).json({
                error: "This email has already been used"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            userName: userName,
            email: email,
            password: hashedPassword,
            fullName: userName
        });

        const accessToken = sign({
            userId: newUser._id,
            userName: userName
        }, process.env.ACCESS_KEY, {
            expiresIn: '15m'
        });

        const refreshToken = sign({
            userId: newUser._id,
            userName: userName
        }, process.env.REFRESH_KEY, {
            expiresIn: '14d'
        });

        res.cookie('accessToken', accessToken, { maxAge: 900000 });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.status(201).json({
            state: true
        });

    } catch (error) {
        res.status(500).json({
            error: "Internal server error while creating the user"
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                error: "User doesn't exist"
            });  //the return is importnat to not stop the work of the router
        }

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {

                return res.status(400).json({
                    errorPassword: "wrong password"
                })

            } else {

                const accessToken = sign({
                    userId: user._id,
                    userName: user.userName
                }, process.env.ACCESS_KEY, {
                    expiresIn: '15m'
                });

                const refreshToken = sign({
                    userId: user._id,
                    userName: user.userName
                }, process.env.REFRESH_KEY, {
                    expiresIn: '14d'
                });

                res.cookie('accessToken', accessToken, { maxAge: 900000 });
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 14 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                });

                res.status(200).json({
                    userName: user.userName,
                    fullName: user.fullName,
                    userImg: user.userImg,
                    state: true
                })

            }
        })

    } catch (error) {

        res.status(500).json({
            error: "Internal server error while searching for the user"
        })

    }

})

router.get('/verify', authMiddleware, async (req, res) => {

    const userId = req.user.userId;

    try {

        const user = await UserModel.findById(userId).select('fullName userImg');

        res.status(200).json({
            userName: req.user.userName,
            fullName: user.fullName,
            userImg: user.userImg
        })

    } catch (error) {

        res.status(500).json({
            error: "Internal server error while searching for the user"
        })

    }

})

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    res.sendStatus(204);//204: It means without content
});


module.exports = router;