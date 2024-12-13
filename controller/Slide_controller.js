const { createSlider,findAllSliders } = require("../usecase/Slider_usecase.js");

const createSliderHandler = async (req, res) => {
  try {
    const newDataSlider = {
      name: req.body.name,
      image: req.body.file,
      url: req.body.url,
      tipe: req.body.tipe,
    };

    const result = await createSlider(req, newDataSlider);

    res.status(201).json({
      message: "add new slider succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllHandler = async(req,res)=>{
    try {
        const slider = await findAllSliders()
        res.status(200).json(slider.rows)
    } catch (error) {
        res.status(500).json({ message: "failed get data slider"})
        console.log(error)
    }
}

module.exports = {
  createSliderHandler,
  findAllHandler
};
