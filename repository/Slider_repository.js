const pool = require("../config/Database.js");

const addSlider = async (newDataSlider) => {
  const { name, image, url, tipe } = newDataSlider;

  const result = await pool.query(
    "INSERT INTO sliders (name,image,url,tipe) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, image, url, tipe]
  );

  return result;
};

const getSliders = async () => {
  const slider = await pool.query("SELECT * FROM sliders");

  return slider;
};

const getSliderById = async (id) => {
  const sliderByid = await pool.query("SELECT * FROM sliders WHERE id=$1", [id]);

  if (sliderByid.length === 0) {
    throw new Error("Id not found");
  }

  return sliderByid;
};

const updateSliderById = async(id,updateData)=>{
  const {name, image, url, tipe} = updateData

  const result = await pool.query('UPDATE sliders SET name=$1, image =$2, url = $3, tipe=$4 WHERE id=$5 RETURNING *', [name, image,url, tipe,id])

  return result
}

const deleteSliderById = async(id)=>{
    const result = await pool.query("DELETE FROM sliders WHERE id=$1 RETURNING image",[id])

    return result
}

module.exports = {
  addSlider,
  getSliders,
  getSliderById,
  updateSliderById,
  deleteSliderById
};
