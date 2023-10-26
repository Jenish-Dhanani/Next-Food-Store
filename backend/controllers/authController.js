const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

// login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Missing email or password with request");
  }
  const user = await User.findOne({ email: String(email).toLowerCase() });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// signup controller
const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  if (!fname || !lname || !email || !password) {
    res.status(400);
    throw new Error("Missing required inputs");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fname: String(fname).toLowerCase(),
    lname: String(lname).toLowerCase(),
    email: String(email).toLowerCase(),
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { loginUser, registerUser };
