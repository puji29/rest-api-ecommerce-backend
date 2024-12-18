const path = require("path");
const fs = require("fs");
const {addCategory} = require("../repository/Category_repository.js")

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

  module.exports = {
    createCategory
  }