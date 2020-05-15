const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();

var User = require('../models/user.model')

function isValid(object) {
    return object.username.toString().length > 0 && object.name.toString().length > 0;
}

router.get('/:username', (req, res) => {
    var username = req.params.username;
    User.find({'username': username}, function(err, succ) {
        if(err) {
            console.log(err)
            res.json(400)
        } else {
            console.log(`${username} exists!`)
            res.json(succ)
        }
    })
});

router.get('/check-following-status/:username/:searchedUsername', (req, res) => {
    var username = req.params.username;
    var searchedUsername = req.params.searchedUsername;
    console.log(username, searchedUsername)
    User.find({'username': username}, function(err, succ) {
        console.log("Found User Account")
        if(err) {
            res.json({status: 'failed'})
        } else {
            for(var i = 0; i <= succ[0].followers.length; i++) {
                if(succ[0].followers[i] === searchedUsername){
                    console.log(`${username} is following ${searchedUsername}`)
                    res.json(true)
                } else {
                    console.log(`${username} is NOT following ${searchedUsername}`)
                    res.json(false)
                }
            }
        }
    })
});


router.post('/:username/:searchedUsername', (req, res) => {
    var username = req.params.username;
    var searchedUsername = req.params.searchedUsername;
    console.log(username, searchedUsername)
    User.find({'username': username}, function(err, succ) {
        if(data.length > 0) {
            console.log(succ)
        } else {
            console.log("User Doesnt Exist")
            res.status(400);
        }
    })
});


// Handle User Validation
// Check database for matching username and email. If new user, add to database, else return that the user is already active. 

router.post('/', (req, res) => {
    User.find({ username: req.body.username }, function(err, data) {
        if(data.length > 0) {
            console.log("User Exists");
            console.log(data);
            res.send(true);
        } else {
            if(isValid(req.body)) {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    name: req.body.name
                });
                newUser.save().then(() => console.log("Saved new user:" + req.body.username)).catch((err) => console.log(err));
                res.send(true);
            }
        }
    });
})





module.exports = router;