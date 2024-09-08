const Transaction = require("../models/transactionModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const issueBook = async (req, res) => {
  const { userId, bookId, issueDate, returnDate, rentAmount } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or Book not found" });
    }

    const transaction = new Transaction({
      userId,
      bookId,
      issueDate,
      returnDate,
      rentAmount,
    });

    await transaction.save();
    res.status(201).json({ message: "Book issued successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const returnBook = async (req, res) => {
  const { bookId, userId, returnDate } = req.body;

  try {
    const transaction = await Transaction.findOne({
      bookId,
      userId,
      returnDate: { $exists: false },
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "No active transaction found for this book" });
    }

    const issuedOn = new Date(transaction.issueDate);
    const returnedOn = new Date(returnDate);
    const daysRented = Math.ceil(
      (returnedOn - issuedOn) / (1000 * 60 * 60 * 24)
    );

    const book = await Book.findById(bookId);
    const rentPerDay = book.rentPerDay;

    const rentAmount = daysRented * rentPerDay;

    transaction.returnDate = returnedOn;
    transaction.rentAmount = rentAmount;

    await transaction.save();

    res.json({ message: "Book returned successfully", rentAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookTransactionHistory = async (req, res) => {
  const { bookId } = req.params;

  try {
    const transactions = await Transaction.find({ bookId }).populate(
      "userId",
      "name"
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalRentForBook = async (req, res) => {
  const { id: bookId } = req.params;

  try {
    const transactions = await Transaction.find({
      bookId,
      rentAmount: { $exists: true },
    });

    if (transactions.length === 0) {
      return res.json({ totalRent: 0, message: "No rent calculated yet" });
    }

    const totalRent = transactions.reduce(
      (total, transaction) => total + transaction.rentAmount,
      0
    );

    res.json({ totalRent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooksIssuedByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ userId }).populate(
      "bookId",
      "name"
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    const transactions = await Transaction.find({
      issueDate: { $gte: start, $lte: end },
    }).populate("bookId userId", "name");

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  issueBook,
  returnBook,
  getBookTransactionHistory,
  getTotalRentForBook,
  getBooksIssuedByUser,
  getTransactionsByDateRange,
};
