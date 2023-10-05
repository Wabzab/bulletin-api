const mongoose = require('mongoose');

// Model for a post
const postschema = mongoose.Schema({
    departments: {type: [String], required: true},
    issue: {type: String, required: true}
})

module.exports = mongoose.model("Post", postschema);