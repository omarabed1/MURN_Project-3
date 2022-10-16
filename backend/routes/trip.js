const express = require("express")
const {
    createtrip,
    gettrip,
    deletetrip,
    edittrip
    } = require("../controllers/tripContoller")

const router = express.Router()


// api/trip/create
router.post('/create',createtrip)
// api/trip/
router.get('/',gettrip)
// api/trip/:id
router.delete('/:_id',deletetrip)
// api/trip/:id
router.patch('/:_id',edittrip)
module.exports = router