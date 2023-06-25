const mongoose = require("mongoose")

const tagsSchema = new mongoose.Schema({
    name : {
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
    color : {
        type : String,
        required : true
    }

}, { timestamps: true })

const Tags = mongoose.models.Tags || mongoose.model("Tags", tagsSchema)

module.exports = Tags;