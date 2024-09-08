const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/all", userController.index);
router.get("/:id", userController.show);
router.post("/add", userController.add);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
