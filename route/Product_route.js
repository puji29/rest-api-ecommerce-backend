const express = require('express')
const { createHandler, findAllHandler,findByIdHandler,updateHandler,deleteHandler } = require("../controller/Product_controller.js")

const router = express.Router()

router.post('/products', createHandler)
router.get('/products', findAllHandler)
router.get('/products/:id',findByIdHandler)
router.put('/products/:id',updateHandler)
router.delete('/products/:id',deleteHandler)

module.exports = router