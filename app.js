// Modules
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

// Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// App Details
const app = express();
const urlprefix = '/api';

// Database and Security
const cert = fs.readFileSync("keys/certificate.pem");
const options = {
    server: {sslCA: cert}
};
const connstring = "mongodb+srv://admin:C6donsoiYQgWquwj@cluster0.wrgkjjg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connstring)
.then(() =>{
    console.log("Connection Success!")
})
.catch(() => {
    console.log("Connection Failure!")
}, options);

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,ContentType,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.get(urlprefix+'/', (req, res) => {
    res.send("Now its an Express!")
});

app.use(urlprefix+'/users', userRoutes);
app.use(urlprefix+'/posts', postRoutes);

module.exports = app;