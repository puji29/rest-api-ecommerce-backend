const path = require("path");
const {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  removeUser,
} = require("../usecase/User_usecase.js");

const createUserHandler = async (req, res) => {
  try {
    const newDataUser = {
      name: req.body.name,
      email: req.body.email,
      alamat: req.body.alamat,
      password: req.body.password,
      role: req.body.role,
      image: req.body.file,
      url: req.body.url
    };

    const result = await createUser(req, newDataUser);

    res.status(201).json({
      message: "add new User succesfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllHandler = async (req, res) => {
  try {
    const User = await findAllUsers();
    res.status(200).json(User.rows);
  } catch (error) {
    res.status(500).json({ message: "failed get data User" });
    console.log(error);
  }
};

const findByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const User = await findUserById(id);

    res.status(200).json(User.rows);
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
      tipe: req.body.tipe,
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

    const result = await updateUser(id, updateData)

    res.status(200).json({
      message: 'User update successfully',
      data: result.rows
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
    console.log(error)

  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await removeUser(id);
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  createUserHandler,
  findAllHandler,
  findByIdHandler,
  updateHandler,
  deleteUserHandler,
};
