const mongose = require('mongoose')

const status = Object.freeze({
    Online : "En ligne",
    Offline : "Hors ligne",
    Inactive : "Inactif"
})

const statusSchema = new mongose.Schema({
    state : {
        type: String,
        enum : Object.values(status),
        default: status.Offline
    },
    user : {
        type: mongose.Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongose.model('Status', statusSchema)