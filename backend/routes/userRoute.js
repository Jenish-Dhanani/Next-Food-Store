const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController.js");
const { authCheck } = require("../middleware/authMiddleware.js");

//sub user routes
router
  .route("/profile")
  .get(authCheck, getUserProfile)
  .put(authCheck, updateUserProfile);

module.exports = router;
