const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkauth = require('../check-auth');
const { model } = require('mongoose');

// Fetch all posts
router.get('', checkauth, (req, res) => {
    Post.find().then((posts) => {
        res.json({
            message: "Posts found",
            posts: posts
        })
    })
})

// Create posts by authenticated users
router.post('/create', checkauth, (req, res) => {
    const post = new Post({
        departments: req.body.departments,
        issue: req.body.issue
    })
    post.save().then(() => {
        res.status(201).json({
            message: "Post created!",
            post: post
        });
    })
})

// Delete posts by authenticated users
router.delete('/delete/:id', checkauth, (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({
                message: "Post deleted"
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        })
})

module.exports = router;