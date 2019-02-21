var validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose')
module.exports = function () {
    var RatingSchema = new mongoose.Schema({
        stars: { type: Number, required:true, },
        
        comment: { type: String, required:true, },

    })

    
    mongoose.model('Rating', RatingSchema);

    var CakeSchema = new mongoose.Schema({
        bakerName: { type: String, required:true, },
        imageUrl: { type: String,  required:true,},
        ratings:[RatingSchema],

    })

    CakeSchema.plugin(uniqueValidator);
    mongoose.model('Cake', CakeSchema);


    
}