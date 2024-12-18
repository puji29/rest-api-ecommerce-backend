const express = require('express')
const { createSliderHandler, findAllHandler,findByIdHandler,updateHandler,deleteSliderHandler } = require("../controller/Slide_controller.js")

const router = express.Router()

router.post('/sliders', createSliderHandler)
router.get('/sliders', findAllHandler)
router.get('/sliders/:id',findByIdHandler)
router.put('/sliders/:id',updateHandler)
router.delete('/sliders/:id',deleteSliderHandler)

module.exports = router