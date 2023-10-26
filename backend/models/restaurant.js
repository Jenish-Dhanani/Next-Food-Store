const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("restaurant", restaurantSchema);
