const express = require('express')
const {createHandler,findAllHandler,findByIdHandler,updateHandler,deleteHandler} = require("../controller/Category_controller.js")

const router = express.Router()

router.post('/categories', createHandler)
router.get('/categories', findAllHandler)
router.get('/categories/:id',findByIdHandler)
router.put('/categories/:id',updateHandler)
router.delete('/categories/:id',deleteHandler)

module.exports = router