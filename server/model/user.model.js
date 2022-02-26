const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userModel = new Schema({
    name: {
        type: String,
        required: [true, 'user name  not entered']
    },
    email: {
        type: String,
        required: [true, 'user email not entered'],
        unique: [true, 'duplicate email'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String, required: [true, 'user password not entered']
    },
    twitter: {
        type: String
    }
},
    { collection: 'userData' }
)

const model = mongoose.model('userModel', userModel);

module.exports = model;