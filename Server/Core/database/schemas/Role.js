const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    grade : {
        type : Number,
        required : true
    },
    default : {
        type : Boolean,
        default : false
    }
})

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema)

module.exports = Role