const express = require('express')
const { createSliderHandler, findAllHandler } = require("../controller/Slide_controller.js")

const router = express.Router()

router.post('/sliders', createSliderHandler)
router.get('/sliders', findAllHandler)

module.exports = router