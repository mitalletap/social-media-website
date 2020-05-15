const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
mongoose.set('useFindAndModify', false);
var Post = require('../models/post.model')
var User = require('../models/user.model');

function isValid(object) {
    return object.username.toString().length > 0 && object.message.toString().length > 0;
}

router.get('/:username', (req, res) => {
    Post.findById(req.params.username)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
    mongoose.disconnect();
});

router.post('/', (req, res) => {
    console.log(req.body)
    if(isValid(req.body)) {
        const newPost = new Post({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            message: req.body.message
        });
        User.findOneAndUpdate({ username: req.body.username } , { $push: { posts: newPost } } , function(error, success) {
            if(error) {
                console.log(error)
            } else {
                newPost.save().then(() => console.log("Saved " + newPost.message)).catch((err) => console.log(err));
            }
        });
        res.send(true);
    } else {
        console.log("Error")
    }
})

module.exports = router;