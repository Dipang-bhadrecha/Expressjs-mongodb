const express = require("express");
const router = express.Router();
const authController = require('../controller/auth/authController');
// const authValidator = require('../validator/user/auth.validator');
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/uploadMiddleware");
const roleAuthMiddleware = require("../helper/roleAuthMiddleware");
const { Admin } = require("mongodb");

router.post("/register", upload.single("profileImage"), authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post('/change-password', authController.changePassword);
router.post('/logout',authController.logoutUser );

router.get('/admin', roleAuthMiddleware([Admin]), (req, res) =>{
    res.json({message:"Admin route accessed"})
})

module.exports = router;
