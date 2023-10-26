const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin/adminController')

router.post('/register', adminController.registerAdmin);

module.exports = router;