const express = require("express");
const router = express.Router();
const userController = require('../controller/user/userController');
const verifyToken = require("../middleware/verifyToken");

router.get("/profile", verifyToken, userController.getUserProfile);
router.put('/:id', userController.updateUserById);

module.exports = router;