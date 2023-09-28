const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkauth = require('../check-auth');
const { model } = require('mongoose');

router.get('', (req, res) => {
    Post.find().then((posts) => {
        res.json({
            message: "Posts found",
            posts: posts
        })
    })
})

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

router.delete('/:id', checkauth, (req, res) => {
    Post.deleteOne({_id: req.params.id})
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