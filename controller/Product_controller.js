const path = require("path")
const {createProduct,findAllProducts,findProductById,updateProduct,removeProduct} = require("../usecase/Product_usecase.js");

const createHandler = async (req, res) => {
    try {
      const newDataProduct = {
        name: req.body.name,
        deskripsi: req.body.dekripsi,
        price: req.body.price,
        sellingPrice: req.body.sellingPrice,
        stock: req.body.stock,
        image: req.body.file,
        url: req.body.url,
        categoryId: req.body.categoryId,
      };
  
      const result = await createProduct(req, newDataProduct);
  
      res.status(201).json({
        message: "add new Product succesfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAllHandler = async (req, res) => {
    try {
      const result = await findAllProducts();
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "failed get data Product" });
      console.log(error);
    }
  };
  
  const findByIdHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await findProductById(id);
  
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
        deskripsi: req.body.deskripsi,
        price: req.body.price,
        sellingPrice: req.body.sellingPrice,
        stock: req.body.stock,
        image: req.body.file,
        url: req.body.url,
        categoryId: req.body.categoryId,
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
  
      const result = await updateProduct(id, updateData)
     
  
      res.status(200).json({
        message: 'Product update successfully',
        data: result
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
      await removeProduct(id);
      res.status(200).json({ message: "Product deleted succesfully" });
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