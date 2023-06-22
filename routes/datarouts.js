const express = require("express")
const datacontroller = require('../controller/datacontroller')
const router = express.Router()
module.exports = router

router.post('/', datacontroller.adddata)
router.get('/:ph', datacontroller.fineddata)
router.patch('/ubdatedata', datacontroller.updeatedata)
router.delete('/delete/:ph', datacontroller.deletedata)
router.get('/allData', datacontroller.finedAllData)