const express = require('express')
const { createUserHandler, findAllHandler,findByIdHandler,updateHandler,deleteUserHandler } = require("../controller/User_controller")

const router = express.Router()

router.post('/users', createUserHandler)
router.get('/users', findAllHandler)
router.get('/users/:id',findByIdHandler)
router.put('/users/:id',updateHandler)
router.delete('/users/:id',deleteUserHandler)

module.exports = router