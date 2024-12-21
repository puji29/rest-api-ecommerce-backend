const path = require("path");
const fs = require("fs");
const {
  addProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../repository/Product_repository.js");

const createProduct = async (req, newDataProduct) => {
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

    newDataProduct.image = fileName;
    newDataProduct.url = url;

    const result = await addProduct(newDataProduct);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findAllProducts = async () => {
  const Products = await getProduct();

  return Products;
};

const findProductById = async (id) => {
  try {
    const Product = await getProductById(id);
    return Product;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const updateProduct = async (id, updateData) => {
  const checkProduct = await getProductById(id);

  if (checkProduct.rowCount === 0) {
    throw new Error("Product not found");
  }

  const oldImage = checkProduct.rows[0].image;
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
  const result = await updateProductById(id, updateData);
  return result.rows[0];
};

const removeProduct = async (id) => {
  const result = await deleteProductById(id);
  if (result.rowCount === 0) {
    throw new Error("Product not found");
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
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  removeProduct,
};
