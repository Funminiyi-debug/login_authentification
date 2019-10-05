
const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    }, 
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }, 
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserModel)