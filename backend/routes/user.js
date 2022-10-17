const express = require('express')
const {loginUser,signupUser,followUser} = require('../controllers/userContoller')
const router = express.Router()

// /api/user/login 
router.post('/login',loginUser)

// /api/user/signup 
router.post('/signup',signupUser)

// /api/user/follow 
router.patch('/follow/:userName',followUser)
module.exports = router