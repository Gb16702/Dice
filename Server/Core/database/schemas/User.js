const mongoose = require('mongoose');
const getImageDirectory = require('../../utils/getImageDirectory');

const defaultAvatars = getImageDirectory();

const userSchema  = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        minLenght : 6,
        maxLength : 32,
    },
    roles : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required : true,
    },
    avatar : {
        type: String,
        default: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
        required : false,
    },
    status : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
    bio : {
        type: String,
        maxlength: 255,
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);