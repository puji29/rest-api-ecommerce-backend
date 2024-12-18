const path = require("path");
const {
  createSlider,
  findAllSliders,
  findSliderById,
  updateSlider,
  removeSlider,
} = require("../usecase/Slider_usecase.js");

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

const findAllHandler = async (req, res) => {
  try {
    const slider = await findAllSliders();
    res.status(200).json(slider.rows);
  } catch (error) {
    res.status(500).json({ message: "failed get data slider" });
    console.log(error);
  }
};

const findByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const slider = await findSliderById(id);

    res.status(200).json(slider.rows);
  } catch (error) {
    if (error.message === "ID Not Found") {
      res.status(404).json({ message: "Id not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const updateHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      name: req.body.name,
      image: req.body.file,
      url: req.body.url,
      tipe: req.body.tipe,
    };

    if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        throw new Error("Invalid image type");
      }

      if (fileSize > 5000000) {
        throw new Error("Image must be less than 5MB");
      }
      const savePath = `./public/image/${fileName}`;
      await file.mv(savePath);
      updateData.image = fileName;
      updateData.url = url;
    }

    const result = await updateSlider(id, updateData)

    res.status(200).json({
      message: 'Slider update successfully',
      data: result.rows
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
    console.log(error)

  }
};

const deleteSliderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await removeSlider(id);
    res.status(200).json({ message: "slider deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  createSliderHandler,
  findAllHandler,
  findByIdHandler,
  updateHandler,
  deleteSliderHandler,
};
