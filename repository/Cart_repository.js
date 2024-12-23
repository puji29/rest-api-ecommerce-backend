const pool = require("../config/Database.js");

const addCart = async (newDataCart) => {
  const { quantity,amount,alamat,password,role,image,url,createdAt } = newDataCart;

  const result = await pool.query(
    "INSERT INTO Carts (quantity,amount,alamat,password,role,image,url,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [quantity,amount,alamat,password,role,image,url,createdAt]
  );

  return result;
};

const getCarts = async () => {
  const Cart = await pool.query("SELECT * FROM Carts");

  return Cart;
};

const getCartById = async (id) => {
  const CartByid = await pool.query("SELECT * FROM Carts WHERE id=$1", [id]);

  if (CartByid.length === 0) {
    throw new Error("Id not found");
  }

  return CartByid;
};

const updateCartById = async(id,updateData)=>{
  const {name, image, url, tipe} = updateData

  const result = await pool.query('UPDATE Carts SET name=$1, image =$2, url = $3, tipe=$4 WHERE id=$5 RETURNING *', [name, image,url, tipe,id])

  return result
}

const deleteCartById = async(id)=>{
    const result = await pool.query("DELETE FROM Carts WHERE id=$1 RETURNING image",[id])

    return result
}

module.exports = {
  addCart,
  getCarts,
  getCartById,
  updateCartById,
  deleteCartById
};
