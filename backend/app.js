// Modules
const express = require('express');
const mongoose = require('mongoose');

// Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// App Details
const app = express();
const urlprefix = '/api';

// Database and Security
const connstring = "mongodb+srv://admin:C6donsoiYQgWquwj@cluster0.wrgkjjg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connstring, {
    tlsAllowInvalidCertificates: true,
    tlsCAFile: "keys/certificate.pem"
})
    .then(() => {
        console.log("Connection Success!")
    })
    .catch((err) => {
        console.log("Connection Failure!")
        console.log(err)
    });

app.use(express.json());

// Enable CORC
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,ContentType,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
});

// Handles a GET requests to the index
app.get(urlprefix + '/', (req, res) => {
    res.send("Now its an Express!")
});

// Defer handling of user or post requests to separate scripts.
app.use(urlprefix + '/users', userRoutes);
app.use(urlprefix + '/posts', postRoutes);

module.exports = app;