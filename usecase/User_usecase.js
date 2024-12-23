const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt")
const {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../repository/User_repository.js")

const createUser = async (req, newDataUser) => {
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
    const now = new Date()
    const date = now.toLocaleDateString()
    const saltRounds = 10
    

    if (!allowedType.includes(ext.toLowerCase())) {
      throw new Error("Invalid image type");
    }

    if (fileSize > 5000000) {
      throw new Error("Image must be les than 5MB");
    }

    const savePath = `./public/image/${fileName}`;
    await file.mv(savePath);

    console.log("file URL:", url);

    newDataUser.image = fileName;
    newDataUser.url = url;
    newDataUser.createdAt = date

    const hashedPassword = await bcrypt.hash(newDataUser.password, saltRounds)
    newDataUser.password = hashedPassword

    const result = await addUser(newDataUser);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findAllUsers = async () => {
  const Users = await getUsers();

  return Users;
};

const findUserById = async (id) => {
  try {
    const User = await getUserById(id);
    return User;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const updateUser = async (id, updateData) => {
  const checkUser = await getUserById(id);

  if (checkUser.rowCount === 0) {
    throw new Error("User not found");
  }

  const oldImage = checkUser.rows[0].image;
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
  const result = await updateUserById(id, updateData);
  return result.rows[0];
};

const removeUser = async (id) => {
  const result = await deleteUserById(id);
  if (result.rowCount === 0) {
    throw new Error("User not found");
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
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  removeUser,
};
