const express = require("express");
const router = express.Router();
const authController = require('../controller/auth/authController');
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/uploadMiddleware");
const checkUserRole = require("../middleware/roleMiddleware");

router.post("/register", upload.single("profileImage"), authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post('/change-password', authController.changePassword);
router.post('/logout',authController.logoutUser );

router.post("/user-dashboard", verifyToken, checkUserRole('user'), (req, res) => {
  });

  router.post("/admin-dashboard", verifyToken, checkUserRole('admin'), (req, res) => {
  });

module.exports = router;
