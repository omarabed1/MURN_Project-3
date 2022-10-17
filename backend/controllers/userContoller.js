const mongoose = require("mongoose")
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    const { userName, password } = req.body
    try {
        const user = await User.login(userName, password)
        const token = jwt.sign({ userId: user._id }, process.env.SECRET)
        const role = user.role
        const followers = user.followers
        res.status(200).json({ role,followers,userName,token })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const signupUser = async (req, res) => {
    const { userName, firstName, lastName, password } = req.body
    let emptyFields = []
    if (!userName) {
        emptyFields.push('userName')
    }
    if (!firstName) {
        emptyFields.push('firstName')
    }
    if (!lastName) {
        emptyFields.push('lastName')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'all fields must be filled', emptyFields })
    }
    try {
        const user = await User.signup(userName, firstName, lastName, password)
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        const role = user.role
        const followers = user.followers
        res.status(200).json({ role,followers,userName,token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const followUser = async (req, res) => {
    const {userName}= req.params

    const user = await User.findOneAndUpdate({userName},{
        ...req.body
    })
    if(!user){
        return res.status(404).json({error: 'No such trip'})
    }
    return res.status(200).json(user)
}
module.exports = { loginUser, signupUser,followUser }