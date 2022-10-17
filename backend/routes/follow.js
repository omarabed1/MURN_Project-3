const express = require("express")
const {
    createfollow,
    getfollow,
    editfollow,
    deletefollow,
    getonefollow
    } = require("../controllers/followContoller")

const router = express.Router()


// api/follow/create
router.post('/create',createfollow)
// api/follow/
router.get('/',getfollow)
// api/follow/:location
router.get('/:location',getonefollow)
// api/follow/:location
router.delete('/:location',deletefollow)
// api/follow/:location
router.patch('/:location',editfollow)

module.exports = router