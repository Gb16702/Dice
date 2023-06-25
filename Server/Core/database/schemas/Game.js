const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
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
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tags",
        required : true
    }]
}, { timestamps: true })

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema)

module.exports = Game;