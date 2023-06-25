const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
}, { timestamps: true })

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)

module.exports = Category;