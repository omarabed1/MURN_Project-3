const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({

    location:{
        type:String,
    },
    followers:{
        type:Number,
        default: 0
    }
},)

module.exports = mongoose.model('follow',followSchema)