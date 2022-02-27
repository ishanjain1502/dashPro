const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    console.log("UserRoute");
    res.send("Welcome to user Route")
})

router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            twitter: req.body.twitter
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.post("/login", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        // Not in the db
        return ({ status: 'error', error: 'invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'helloWorld123')
        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false })
    }
})


module.exports = router;