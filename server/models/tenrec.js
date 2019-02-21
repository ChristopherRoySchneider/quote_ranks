var validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose')
module.exports = function () {

    var TenrecSchema = new mongoose.Schema({
        name: { type: String, required: [true, "Name is Required"], minlength: [2, "Min Name Length is 2"] },
        subfamily: { type: String, required: [true, "Subfamily is Required"], minlength: [2, "Min Subfamily Length is 2"] },
        genus: { type: String, required: [true, "Genus is Required"], minlength: [2, "Min Genus Length is 2"] },
        species: { type: String, required: [true, "Species is Required"], minlength: [2, "Min Species Length is 2"] },
        link: { type: String, required: [true, "Link is Required"], minlength: [2, "Min Link Length is 2"] },
        picture: { type: String },
    })
    mongoose.model('Tenrec', TenrecSchema); // We are setting this Schema in our Models as 'tenrec'
}