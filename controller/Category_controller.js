const {createCategory} = require("../usecase/Category_usecase.js")

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

  module.exports = {
    createHandler
  }