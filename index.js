const express = require('express');
const fileUpload = require('express-fileupload');
require("dotenv").config()
const SliderRoute = require("./route/Slider_route")
const CategoryRoute = require("./route/Category_route")
const ProductRoute = require("./route/Product_route")
const port = process.env.API_PORT || 4000;

app = express()
app.use(express.json())
app.use(fileUpload())
app.use(express.static("public"))

app.use(SliderRoute)
app.use(CategoryRoute)
app.use(ProductRoute)

app.get('/', (req,res) => {
    res.send('Hello word')
})

app.listen(port, () =>{
    console.log(`Server run in port:${port}`)
})