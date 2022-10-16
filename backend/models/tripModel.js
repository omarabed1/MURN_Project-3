const mongoose = require("mongoose")

const tripSchema = new mongoose.Schema({
    picture:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    fromDate:{
        type:Date,
        required: true
    },
    toDate:{
        type:Date,
        required: true
    },
    followers:{
        type:Number,
        default:0
    }
},{ timestamps: true })

module.exports = mongoose.model('trip',tripSchema)