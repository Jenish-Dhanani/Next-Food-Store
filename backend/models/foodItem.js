const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const foodItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, text: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, enum: ["Yes", "No"], required: true },
    images: [{ type: String }],
    restaurantId: {
      type: ObjectId,
      required: true,
      ref: "restaurant",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("foodItem", foodItemSchema);
