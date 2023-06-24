const mongoose = require('mongoose');

const Article = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
    }
})