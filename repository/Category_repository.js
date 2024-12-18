const pool = require("../config/Database.js");

const addCategory = async (newDataCategory) => {
  const { name, image, url, tipe } = newDataCategory;

  const result = await pool.query(
    "INSERT INTO categories (name,image,url) VALUES ($1,$2,$3) RETURNING *",
    [name, image, url]
  );

  return result;
};

const getCategory = async () => {
    const result = await pool.query("SELECT * FROM categories");
  
    return result;
  };
  
  const getCategoryById = async (id) => {
    const categoryByid = await pool.query("SELECT * FROM categories WHERE id=$1", [id]);
  
    if (categoryByid.length === 0) {
      throw new Error("Id not found");
    }
  
    return categoryByid;
  };

  const updateCategoryById = async(id,updateData)=>{
    const {name, image, url} = updateData
  
    const result = await pool.query('UPDATE categories SET name=$1, image =$2, url = $3 WHERE id=$4 RETURNING *', [name, image,url,id])
  
    return result
  }
  
  const deleteCategoryById = async(id)=>{
      const result = await pool.query("DELETE FROM categories WHERE id=$1 RETURNING image",[id])
  
      return result
  }


module.exports = {
    addCategory,
    getCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}