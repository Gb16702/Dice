const mongoose = require('mongoose');
const getImageDirectory = require('../../utils/getImageDirectory');

const minPasswordLength = 6;
const maxPasswordLength = 32;

const defaultAvatarDirectory = getImageDirectory();

const userSchema  = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match : /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    password : {
        type: String,
        required: true,
        minLenght: minPasswordLength,
        maxLength: maxPasswordLength
    },
    roles : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required : true,
    },
    avatar : {
        type: String,
        default: defaultAvatarDirectory[Math.floor(Math.random() * defaultAvatarDirectory.length)],
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

userSchema.index({email : 1})

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;