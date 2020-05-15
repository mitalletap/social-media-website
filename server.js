
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

var Post = require('./models/post.model')

app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'frontend/build')));



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.get('/', (req, res) => {
    Post.find({}, function (err, post) {
        if(err) {
            res.send("Something went wrong")
            next();
        } 
        res.json(post);
    });
    console.log("accessing all posts");
});

app.use('/post', postRoutes);
app.use('/user', userRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});



app.listen(port, function () {
    console.log("Server is running on port: " + port)
})