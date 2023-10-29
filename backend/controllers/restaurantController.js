const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurant");

// create restaurant controller
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, address, city, state, country, image } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    city,
    state,
    country,
    image,
  });

  if (restaurant) {
    res.status(201).json(restaurant);
  } else {
    res.status(500);
    throw new Error("Invalid restaurant data");
  }
});

const getRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  res.json(restaurant);
});

// update restaurant controller
const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, address, city, state, country, image } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    restaurant.name = name;
    restaurant.address = address;
    restaurant.city = city;
    restaurant.state = state;
    restaurant.country = country;
    restaurant.image = image;

    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// list restaurants controller
const listOfRestaurant = asyncHandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    throw new Error("Failed to get restaurants");
  }
});

// inset dummy data
const insertSampleData = async (req, res) => {
  const sampleData = [
    {
      name: "The Food Drama",
      address:
        "Besides Geetanjali Party Plot, near sterling cancer hospital Sindhu bhawan road Bodakdev, Ahmedabad, Bodakdev, West, Thaltej",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "The Grand Bhagwati",
      address: "Circle, Dumas Rd, Magdalla",
      city: "Surat",
      state: "Gujarat",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  try {
    await Restaurant.insertMany(sampleData);
    console.log("Sample data inserted");
  } catch (error) {
    console.log("Failed to insert sample data");
  }
};

// insertSampleData();

module.exports = {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  listOfRestaurant,
};
