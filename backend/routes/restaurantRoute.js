const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  updateRestaurant,
  listOfRestaurant,
} = require("../controllers/restaurantController.js");
const { authCheck } = require("../middleware/authMiddleware.js");

//sub restaurant routes
router
  .post("/", authCheck, createRestaurant)
  .get("/", authCheck, listOfRestaurant);

router.put("/:id", authCheck, updateRestaurant);

module.exports = router;
