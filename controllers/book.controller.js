const db = require("../models");
const Book = db.books;

const constants = require("../constants");

// // Create and Save a new Book
exports.create = async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
    });

    const result = await book.save();

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
  try {
    const result = await Book.find({ ...req.query }).populate("book_type");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: err.message || "Some error occurred while retrieving Book.",
    });
  }
};

// // Find a single Book with an id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findById(id).populate("book_type");
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

// // Update a Book by the id in the request
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const book = {
      ...req.body,
    };

    const updateRes = await Book.findByIdAndUpdate(id, book, {
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

// // Delete a Book with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndRemove(id, {
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
