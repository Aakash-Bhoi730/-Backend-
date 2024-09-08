const Book = require("../models/bookModel");

const createBook = async (req, res) => {
  try {
    const books = await Book.insertMany(req.body);
    res.status(201).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBooksByTerm = async (req, res) => {
  try {
    const { term } = req.query;
    const books = await Book.find({ name: { $regex: term, $options: "i" } });
    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getBooksByRentRange = async (req, res) => {
  try {
    const { minRent, maxRent } = req.query;
    const books = await Book.find({
      rentPerDay: { $gte: minRent, $lte: maxRent },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBooksByFilter = async (req, res) => {
  try {
    const { category, term, minRent, maxRent } = req.query;
    const books = await Book.find({
      category,
      name: { $regex: term, $options: "i" },
      rentPerDay: { $gte: minRent, $lte: maxRent },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getBooksByTerm,
  getBooksByRentRange,
  getBooksByFilter,
};
