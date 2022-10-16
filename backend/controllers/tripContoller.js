const mongoose = require("mongoose")
const Trip = require("../models/tripModel")

const createtrip = async (req, res) => {
    const { picture, location, price, description, fromDate, toDate, followers } = req.body
    let emptyFields = []
    if (!picture) {
        emptyFields.push('picture')
    }
    if (!location) {
        emptyFields.push('location')
    }
    if (!price) {
        emptyFields.push('price')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!fromDate) {
        emptyFields.push('fromDate')
    }
    if (!toDate) {
        emptyFields.push('toDate')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    try {
        const trip = await Trip.create({picture,location,price,description,fromDate,toDate,followers})
        res.status(200).json(trip)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const gettrip = async (req, res) => {
    try {
        const trips = await Trip.find({}).sort({createdAt: -1})
        res.status(200).json(trips)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deletetrip = async (req, res) => {
    const {_id}= req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'its not the correct id'})
    }
    const trip = await Trip.findByIdAndDelete({_id},{
        ...req.body
    })
    if(!trip){
        return res.status(404).json({error: 'No such trip'})
    }
    return res.status(200).json(trip)
}

const edittrip = async (req, res) => {
    const {_id}= req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'its not the correct id'})
    }
    const trip = await Trip.findByIdAndUpdate({_id},{
        ...req.body
    })
    if(!trip){
        return res.status(404).json({error: 'No such trip'})
    }
    return res.status(200).json(trip)
}
module.exports = { createtrip, gettrip, deletetrip,edittrip }