const mongoose = require('mongoose');

const postschema = mongoose.Schema({
    departments: {type: [String], required: true},
    issue: {type: String, required: true}
})

module.exports = mongoose.model("Post", postschema);