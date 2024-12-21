const pool = require("../config/Database.js");

const addProduct = async (newDataProduct) => {
  const { name,deskripsi,price,sellingPrice,stock, image, url, categoryId } = newDataProduct;

  const result = await pool.query(
    "INSERT INTO products ( name,deskripsi,price,sellingprice,stock,image,url,category_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [name, deskripsi,price,sellingPrice,stock,image, url,categoryId]
  );

  return result;
};

const getProduct = async () => {
    const result = await pool.query("SELECT * FROM products");
  
    return result;
  };
  
  const getProductById = async (id) => {
    const ProductByid = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
  
    if (ProductByid.length === 0) {
      throw new Error("Id not found");
    }
  
    return ProductByid;
  };

  const updateProductById = async(id,updateData)=>{
    const {name, deskripsi,price,sellingPrice,stock,image, url,categoryId} = updateData
  
    const result = await pool.query('UPDATE products SET name=$1,deskripsi=$2,price=$3,sellingprice=$4, stock=$5, image =$6, url = $7, category_id=$8 WHERE id=$9 RETURNING *', [name, deskripsi,price,sellingPrice,stock,image, url,categoryId,id])
  
    return result
  }
  
  const deleteProductById = async(id)=>{
      const result = await pool.query("DELETE FROM products WHERE id=$1 RETURNING image",[id])
  
      return result
  }


module.exports = {
    addProduct,
    getProduct,
    getProductById,
    updateProductById,
    deleteProductById
}