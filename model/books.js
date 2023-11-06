const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookSchema = new Schema({
    "title": {type: String , require:true},
    "author": {type:  String, require:true},
    "description": {type: String , require:true},
    "publicationYear": {type: Number , require:true},
    "isbn": {type: Number , require:true},

})

module.exports = mongoose.model('Book',bookSchema , 'Book')