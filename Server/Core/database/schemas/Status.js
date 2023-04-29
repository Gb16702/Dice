const mongoose = require('mongoose')

const status = Object.freeze({
    Online : "En ligne",
    Offline : "Hors ligne",
    Inactive : "Inactif"
})

const statusSchema = new mongoose.Schema({
    state : {
        type: String,
        enum : Object.values(status),
        default: status.Online
    },
    default : {
        type : Boolean,
        default : false
    },
})

const Status = mongoose.models.Status || mongoose.model("Status", statusSchema)
module.exports = Status
