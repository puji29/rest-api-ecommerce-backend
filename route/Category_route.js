const express = require('express')
const {createHandler} = require("../controller/Category_controller.js")

const router = express.Router()

router.post('/categories', createHandler)
// router.get('/sliders', findAllHandler)
// router.get('/sliders/:id',findByIdHandler)
// router.delete('/sliders/:id',deleteSliderHandler)

module.exports = router