const express = require("express");
const router = express.Router();
const {
  createFoodItem,
  updateFoodItem,
  listFoodItem,
  deleteFoodItem,
  listFoodItemByRestaurant,
} = require("../controllers/foodController.js");
const { authCheck } = require("../middleware/authMiddleware.js");

//sub food routes
router.route("/").post(authCheck, createFoodItem).get(authCheck, listFoodItem);
router.get("/by-restaurant/:id", listFoodItemByRestaurant);
router
  .route("/:id")
  .put(authCheck, updateFoodItem)
  .delete(authCheck, deleteFoodItem);

module.exports = router;
