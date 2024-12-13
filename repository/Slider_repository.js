const pool = require('../config/Database.js')

const addSlider = async (newDataSlider) => {
    const {name,image,url, tipe} = newDataSlider

    const result = await pool.query(
        "INSERT INTO sliders (name,image,url,tipe) VALUES ($1,$2,$3,$4) RETURNING *",[name,image,url,tipe]
    )

    return result
}

const getSliders= async()=>{
    const slider = await pool.query("SELECT * FROM sliders")

    return slider
}

module.exports = {
    addSlider,
    getSliders
}