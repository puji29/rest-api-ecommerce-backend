const path = require("path");
const fs = require("fs");
const {
  addSlider,
  getSliders,
  getSliderById,
  deleteSliderById,
} = require("../repository/Slider_repository.js");

const createSlider = async (req, newDataSlider) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("No file upload found");
    }

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
      throw new Error("Image must be les than 5MB");
    }

    const savePath = `./public/image/${fileName}`;
    await file.mv(savePath);

    console.log("file URL:", url);

    newDataSlider.image = fileName;
    newDataSlider.url = url;

    const result = await addSlider(newDataSlider);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findAllSliders = async () => {
  const sliders = await getSliders();

  return sliders;
};

const findSliderById = async (id) => {
  try {
    const slider = await getSliderById(id);
    return slider;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const removeSlider = async (id) => {
  const result = await deleteSliderById(id);
  if (result.rowCount === 0) {
    throw new Error("Slider not found");
  }
  const imagePath = path.join(
    __dirname,
    "..",
    "public",
    "image",
    result.rows[0].image
  );
  await fs.promises.unlink(imagePath);
  return result.rows[0];
};

module.exports = {
  createSlider,
  findAllSliders,
  findSliderById,
  removeSlider,
};
