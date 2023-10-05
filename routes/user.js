const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fetches all users from mongoDB
router.get('', (req, res) => {
    User.find().then((users) => {
        res.json({
            message: "Users found",
            users: users
        });
    });
})

// Handles signing up of Users
router.post('/signup', (req, res) => {
    // Check that inputs are filled
    if (req.body.username == "" || req.body.password == "") {
        return res.status(409).json({
            message: "One or more input fields are blank!"
        });
    };
    User.findOne({username: req.body.username})
    .then(user => {
        // Prevent users with the same name
        if (user) {
            return res.status(409).json({
                message: "Name already taken!"
            });
        }
        // Generate a salt for the user
        const salt = bcrypt.genSaltSync(10);
        // Hash password with generated salt
        bcrypt.hash(req.body.password, salt)
        .then(hash => {
            // Store user in mongoDB
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

// Handle login of users
router.post('/login', (req, res) => {
    // Look for user with matching name
    User.findOne({username: req.body.username})
    .then(user => {
        // Check for matching password
        bcrypt.hash(req.body.password, user.salt)
        .then(hash => {
            if (hash != user.password) {
                return res.status(401).json({
                    message: "Incorrect credentials!",
                    hash: hash,
                    password: user.password
                });
            }
            // Authentication token to validate user for future requests.
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