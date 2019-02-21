var validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose')
module.exports=function(){

var UserSchema = new mongoose.Schema({
    firstname: { type: String, required: [true, "First Name is Required"], minlength: [2, "Min Name Length is 2"] },
    lastname: { type: String, required: [true, "First Name is Required"], minlength: [2, "Min Name Length is 2"] },
    email: { type: String, required: [true, "Email is Required"], minlength: [2, "Min email Length is 2"], unique: true, validate: [validator.isEmail, "Email format invalid"] },
    birthday: { type: Date, required: [true, "Birthday is Required"], },
    password: { type: String, required: [true, "Password is Required"], minlength: [8, "Min Password Length is 8"] },

})

UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'tenrec'
}