const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('', (req, res) => {
    User.find().then((users) => {
        res.json({
            message: "Users found",
            fruits: users
        });
    });
})

router.post('/signup', (req, res) => {
    User.findOne({username: req.body.username})
    .then(user => {
        if (user) {
            return res.status(409).json({
                message: "Name already taken!"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(req.body.password, salt)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash,
                salt: salt
            });
            user.save()
            .then(result => {
                res.status(201).json({
                    message: "User created",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })
    })
})

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
    .then(user => {
        bcrypt.hash(req.body.password, user.salt)
        .then(hash => {
            if (hash != user.password) {
                return res.status(401).json({
                    message: "Incorrect credentials!",
                    hash: hash,
                    password: user.password
                });
            }
            const token = jwt.sign({
                username: user.username,
                userid: user._id
            },
                "this_is_a_super_secret_secret",
            {
                expiresIn: "1h"
            });
            res.status(200).json({token: token});
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Authentication Failure"
        });
    })
})

module.exports = router;