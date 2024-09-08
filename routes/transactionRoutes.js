const express = require("express");
const router = express.Router();

const transactionController = require("../controller/transactionController");

router.post("/issue", transactionController.issueBook);
router.get("/return", transactionController.returnBook);
router.get(
  "/history/book/:id",
  transactionController.getBookTransactionHistory
);
router.get("/rent/book/:id", transactionController.getTotalRentForBook);
router.get("/history/user/:id", transactionController.getBooksIssuedByUser);
router.get("/history/dates", transactionController.getTransactionsByDateRange);

module.exports = router;
