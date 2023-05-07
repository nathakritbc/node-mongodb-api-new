const db = require("../models");
const Product = db.products;

const constants = require("../constants");

const fs = require("fs");

const removeImage = async (path) => {
  await fs.unlinkSync(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

// // Create and Save a new Product
exports.create = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
    });

    const result = await product.save();

    res.status(201).json({
      result: result,
      message: constants.kResultOk,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  const { p_name } = req.query;
  const condition = p_name
    ? { p_name: { $regex: new RegExp(p_name), $options: "i" } }
    : {};
  try {
    const result = await Product.find(condition);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: err.message || "Some error occurred while retrieving products.",
    });
  }
};

// // Find a single Product with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};

// // Update a Product by the id in the request
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    // const result = await Product.findById(id);

    // if (!result) {
    //   res.status(404).json({
    //     message: constants.kResultNok,
    //   });
    //   return;
    // }

    const product = {
      ...req.body,
    };

    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      useFindAndModify: false,
    });

    const ImgPath = updateProduct.p_image;
    const pathRemove = `./uploads/images/${ImgPath}`;

    removeImage(pathRemove);

    res.status(200).json({
      result: { ...updateProduct._doc, ...req.body },
      message: constants.kResultOk,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// // Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    const ImgPath = result.p_image;
    const imagePath = `./uploads/images/${ImgPath}`;
    if (!result) {
      console.error("Internal error");
      res.status(500).json({ message: constants.kResultNok });
      return;
    }
    await removeImage(imagePath);
    res.status(200).json({
      message: constants.kResultOk,
      result: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: constants.kResultNok,
    });
  }
};
