const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const restaurantRouter = require("./restaurantRoute");
const foodRouter = require("./foodRoute");

// sub routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/restaurant", restaurantRouter);
router.use("/food", foodRouter);

module.exports = router;
