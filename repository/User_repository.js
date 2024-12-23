const pool = require("../config/Database.js");

const addUser = async (newDataUser) => {
  const { name,email,alamat,password,role,image,url,createdAt } = newDataUser;

  const result = await pool.query(
    "INSERT INTO Users (name,email,alamat,password,role,image,url,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [name,email,alamat,password,role,image,url,createdAt]
  );

  return result;
};

const getUsers = async () => {
  const User = await pool.query("SELECT * FROM Users");

  return User;
};

const getUserById = async (id) => {
  const UserByid = await pool.query("SELECT * FROM Users WHERE id=$1", [id]);

  if (UserByid.length === 0) {
    throw new Error("Id not found");
  }

  return UserByid;
};

const updateUserById = async(id,updateData)=>{
  const {name,email,alamat,password,role, image, url,updatedAt} = updateData

  const result = await pool.query('UPDATE Users SET name=$1,email=$2,alamat=$3, password=$4,role=$5,image =$6, url = $7, updated_at=$8 WHERE id=$9 RETURNING *', [name,email,alamat,password,role, image, url,updatedAt,id])

  return result
}

const deleteUserById = async(id)=>{
    const result = await pool.query("DELETE FROM Users WHERE id=$1 RETURNING image",[id])

    return result
}

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
