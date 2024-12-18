const path = require("path")
const {createCategory,findAllCategory,findcategoryById,updateCategory,removeCategory} = require("../usecase/Category_usecase.js");

const createHandler = async (req, res) => {
    try {
      const newDataCategory = {
        name: req.body.name,
        image: req.body.file,
        url: req.body.url,
      };
  
      const result = await createCategory(req, newDataCategory);
  
      res.status(201).json({
        message: "add new category succesfully",
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAllHandler = async (req, res) => {
    try {
      const result = await findAllCategory();
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "failed get data category" });
      console.log(error);
    }
  };
  
  const findByIdHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await findcategoryById(id);
  
      res.status(200).json(result.rows);
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
  
      const result = await updateCategory(id, updateData)
  
      res.status(200).json({
        message: 'Category update successfully',
        data: result.rows
      })
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
      console.log(error)
  
    }
  };
  
  const deleteHandler = async (req, res) => {
    try {
      const { id } = req.params;
      await removeCategory(id);
      res.status(200).json({ message: "Category deleted succesfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };

  module.exports = {
    createHandler,
    findAllHandler,
    findByIdHandler,
    updateHandler,
    deleteHandler
  }