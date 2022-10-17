const mongoose = require('mongoose')
const Follow = require('../models/followModel')

const createfollow = async(req,res)=>{
    const { location, followers}= req.body
    try {
        const follow = await Follow.create({location,followers})
        res.status(200).json(follow)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getfollow = async(req,res)=>{
    try {
        const follow = await Follow.find({}).sort({createdAt: -1})
        res.status(200).json(follow)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const getonefollow = async(req,res)=>{
    const {location}= req.params
    try {
        const follow = await Follow.findOne({location})
        res.status(200).json(follow)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const editfollow = async(req,res)=>{
    const {location}= req.params
    const follow = await Follow.findOneAndUpdate({location},{
        ...req.body
    })
    if(!follow){
        return res.status(404).json({error: 'No such follow'})
    }
    return res.status(200).json(follow)
}

const deletefollow = async(req,res)=>{
    const {location}= req.params
    const follow = await Follow.findOneAndDelete({location},{
        ...req.body
    })
    if(!follow){
        return res.status(404).json({error: 'No such follow'})
    }
    return res.status(200).json(follow)
}

module.exports = { createfollow, getfollow, getonefollow,editfollow,deletefollow }