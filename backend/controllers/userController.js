const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

// user profile controller
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404);
    throw new Error("User profile not found");
  }
  return res.json(req.user);
});

// update user profile controller
const updateUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404);
    throw new Error("User profile not found");
  }

  const user = req.user;
  user.fname = req.body.fname || user.fname;
  user.lname = req.body.lname || user.lname;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    fname: updatedUser.fname,
    lname: updatedUser.lname,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
  });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};
