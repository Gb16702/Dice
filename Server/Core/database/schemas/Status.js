const mongoose = require('mongoose')

const status = Object.freeze({
    Online : "En ligne",
    Offline : "Hors ligne",
    Inactive : "Inactif",
    Playing : "En jeu",
})

const statusSchema = new mongoose.Schema({
    state : {
        type: String,
        enum : Object.values(status),
        default: status.Online
    },
    slug : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    default : {
        type : Boolean,
        default : false
    },
}, {timestamps : true})

const Status = mongoose.models.Status || mongoose.model("Status", statusSchema)
module.exports = Status
