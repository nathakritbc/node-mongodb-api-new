const db = require("../models");
const BookType = db.books_types;

const constants = require("../constants");

// // Create and Save a new BookType
exports.create = async (req, res) => {
  try {
    const bookType = new BookType({
      ...req.body,
    });

    const result = await bookType.save();

    res.status(201).json({
      result: result,
      message: constants.kResultOk,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// Retrieve all Books from the database.
exports.findAll = async (req, res) => {
  const { book_type_name } = req.query;
  const condition = book_type_name
    ? { book_type_name: { $regex: new RegExp(book_type_name), $options: "i" } }
    : {};
  try {
    const result = await BookType.find(condition);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: err.message || "Some error occurred while retrieving BookType.",
    });
  }
};

// // Find a single BookType with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookType.findById(id);
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

// // Update a BookType by the id in the request
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const bookType = {
      ...req.body,
    };

    const updateRes = await BookType.findByIdAndUpdate(id, bookType, {
      useFindAndModify: false,
    });

    res.status(200).json({
      result: { ...updateRes._doc, ...req.body },
      message: constants.kResultOk,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

// // Delete a BookType with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookType.findByIdAndRemove(id, {
      useFindAndModify: false,
    });

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
