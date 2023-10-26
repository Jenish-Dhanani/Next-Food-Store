const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

//sub auth routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
