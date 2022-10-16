const express = require('express')
const {loginUser,signupUser} = require('../controllers/userContoller')
const router = express.Router()

// /api/user/login 
router.post('/login',loginUser)

// /api/user/signup 
router.post('/signup',signupUser)

module.exports = router