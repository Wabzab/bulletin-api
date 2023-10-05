const mongoose = require('mongoose');

// Model for a user
const userschema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true}
})

module.exports = mongoose.model("User", userschema);