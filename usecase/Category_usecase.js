const path = require("path");
const fs = require("fs");
const {addCategory, getCategory,getCategoryById,updateCategoryById,deleteCategoryById} = require("../repository/Category_repository.js")

const createCategory = async (req, newDataCategory) => {
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
  
      newDataCategory.image = fileName;
      newDataCategory.url = url;
  
      const result = await addCategory(newDataCategory);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const findAllCategory = async () => {
    const result = await getCategory();
  
    return result;
  };
  
  const findcategoryById = async (id) => {
    try {
      const result = await getCategoryById(id);
      return result;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  };
  
  const updateCategory = async (id, updateData) => {
    const checkCategory = await getCategoryById(id);
  
    if (checkCategory.rowCount === 0) {
      throw new Error("Category not found");
    }
  
    const oldImage = checkCategory.rows[0].image;
    if (oldImage && oldImage !== updateData.image) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "public",
        "image",
        oldImage
      );
      try {
        await fs.access(oldImagePath)
        await fs.promises.unlink(oldImagePath);
      } catch (error) {
        console.warn(`File not found : ${oldImagePath},skiping deletion`)
      }
    }
    const result = await updateCategoryById(id, updateData);
    return result.rows[0];
  };
  
  const removeCategory = async (id) => {
    const result = await deleteCategoryById(id);
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
    createCategory,
    findAllCategory,
    findcategoryById,
    updateCategory,
    removeCategory
  }