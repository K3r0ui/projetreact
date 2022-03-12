const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { Coach } = require('../models/coach');

// router.get('/list', async (req, res) => {
//     const coackList = await Coach.find();
//     if (!coackList) {
//         res.status(500).json({ success: false });
//     }
//     res.send(coackList);
// })


router.post('/signup', async (req, res) => {
    let coach = new Coach({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 15),
        dob: req.body.dob,
        firstAuth: false,
    })
    coach = await coach.save();
    if (!coach) {
        return res.status(404).send('the coach cannot be created')
    }
    res.send(coach);
});


router.post('/login', async (req, res) => {
    const coach = await Coach.findOne({ email: req.body.email })
    const secret = "azerty";
    if (!coach) {
        return res.status(400).send('the coach not found')
    }
    if (coach && bcrypt.compareSync(req.body.password, coach.password)) {
        const token = jwt.sign({
            coachId: coach.id,
        },
            secret,
            { expiresIn: '1d' })

        res.status(200).send({ coach, token: token })
    } else {
        res.status(400).send('password is wrong');
    }
});

export default router;