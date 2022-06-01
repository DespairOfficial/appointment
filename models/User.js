const { Schema, model } = require('mongoose')
const db = require('../db')

const userSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 11,
        trim: true,
    },
})
module.exports = db.model('User', userSchema)
