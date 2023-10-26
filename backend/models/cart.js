const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "foodItem",
        },
        price: Number,
        quantity: Number,
      },
    ],
    cartTotal: Number,
    orderedBy: { type: ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", cartSchema);
