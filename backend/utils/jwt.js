const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT token secret not found");
  }
  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = {
  generateToken,
};
