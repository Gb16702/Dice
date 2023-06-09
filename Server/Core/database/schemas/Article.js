const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
    },
    slug : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true,
        index: true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tags",
        required : true
    }],
    picture : {
        type : String,
        required : true
    }

}, { timestamps: true })

const Article = mongoose.models.Article || mongoose.model("Article", articleSchema)

module.exports = Article;