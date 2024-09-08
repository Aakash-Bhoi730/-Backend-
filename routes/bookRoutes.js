const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");

router.post("/add", bookController.createBook);
router.get("/search", bookController.getBooksByTerm);
router.get("/rent", bookController.getBooksByRentRange);
router.get("/filter", bookController.getBooksByFilter);

module.exports = router;
