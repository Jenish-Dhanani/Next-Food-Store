const asyncHandler = require("express-async-handler");
const FoodItem = require("../models/foodItem");

// create food item controller
const createFoodItem = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    price,
    availability,
    images,
    restaurantId,
  } = req.body;

  const foodItem = await FoodItem.create({
    name,
    description,
    category,
    price,
    availability,
    images,
    restaurantId,
  });

  if (foodItem) {
    res.status(201).json(foodItem);
  } else {
    res.status(500);
    throw new Error("Invalid food item data");
  }
});

// update food item controller
const updateFoodItem = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    price,
    availability,
    images,
    restaurantId,
  } = req.body;

  const updatedFoodItem = await FoodItem.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      price,
      availability,
      images,
      restaurantId,
    },
    { new: true }
  );

  if (!updatedFoodItem) {
    res.status(404);
    throw new Error("Food item not found");
  }

  res.json(updatedFoodItem);
});

// get list of food item controller
const listFoodItem = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Check if search parameter is present in the request query
    if (search) {
      // Use regular expressions to perform case-insensitive search
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }

    const foodItems = await FoodItem.find(query);
    res.json(foodItems);
  } catch (error) {
    throw new Error("Failed to retrieve food items");
  }
});

// get list food items by restaurant controller
const listFoodItemByRestaurant = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const foodItems = await FoodItem.find({ restaurantId: id });
    res.json(foodItems);
  } catch (error) {
    throw new Error("Failed to retrieve food items by restaurant");
  }
});

// delete food item controller
const deleteFoodItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedFoodItem = await FoodItem.findByIdAndDelete(id);

  if (!deletedFoodItem) {
    res.status(404);
    throw new Error("Food item not found");
  }

  res.json({ _id: id });
});

// insert dummy data
const insertDummyData = async () => {
  try {
    const foodItems = [
      {
        name: "Vegetable Curry",
        description:
          "A savory curry made with mixed vegetables in a spiced sauce.",
        category: "Curries",
        price: 100,
        availability: "Yes",
        images: [
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a457137e0859d821f078f",
      },
      {
        name: "Caprese Salad",
        description:
          "A refreshing salad made with fresh mozzarella, tomatoes, and basil leaves.",
        category: "Salads",
        price: 240,
        availability: "Yes",
        images: [
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=1980&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a48149ed56d34e008dcc0",
      },
      {
        name: "Spinach and Mushroom Lasagna",
        description:
          "Layered pasta dish with spinach, mushrooms, and creamy cheese sauce.",
        category: "Pasta",
        price: 300,
        availability: "No",
        images: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1981&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a459ffa54376dd35d74db",
      },
      {
        name: "Stir-fried Vegetables",
        description:
          "A medley of colorful vegetables stir-fried in a tangy sauce.",
        category: "Stir-fry",
        price: 170,
        availability: "Yes",
        images: [
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a457137e0859d821f078f",
      },
      {
        name: "Roasted Vegetable Wrap",
        description:
          "A healthy wrap filled with roasted vegetables and a flavor-packed dressing.",
        category: "Wraps",
        price: 60,
        availability: "Yes",
        images: [
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a48149ed56d34e008dcc0",
      },
      {
        name: "Paneer Tikka Masala",
        description:
          "A classic Indian dish made with grilled paneer (cheese) in a creamy tomato sauce.",
        category: "Curries",
        price: 110,
        availability: "Yes",
        images: [
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=1547&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a459ffa54376dd35d74db",
      },
      {
        name: "Mushroom Risotto",
        description:
          "Creamy risotto made with arborio rice and sautéed mushrooms.",
        category: "Risotto",
        price: 105,
        availability: "Yes",
        images: [
          "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a457137e0859d821f078f",
      },
      {
        name: "Quinoa Salad",
        description:
          "A nutritious salad made with quinoa, mixed vegetables, and a zesty dressing.",
        category: "Salads",
        price: 320,
        availability: "Yes",
        images: [
          "https://images.unsplash.com/photo-1564683214965-3619addd900d?auto=format&fit=crop&q=80&w=1909&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a48149ed56d34e008dcc0",
      },
      {
        name: "Vegetable Biryani",
        description:
          "A fragrant rice dish cooked with basmati rice, vegetables, and aromatic spices.",
        category: "Rice Dishes",
        price: 130,
        availability: "Yes",
        images: [
          "https://plus.unsplash.com/premium_photo-1672363353897-ae5a81a1ab57?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a459ffa54376dd35d74db",
      },
      {
        name: "Rice Parmesan",
        description:
          "Breaded and fried rice topped with tomato sauce and melted cheese.",
        category: "Italian",
        price: 100,
        availability: "No",
        images: [
          "https://plus.unsplash.com/premium_photo-1672363353887-d5a9d1a3c8c3?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        restaurantId: "653a457137e0859d821f078f",
      },
    ];

    await FoodItem.insertMany(foodItems);

    console.log("Dummy data inserted successfully");
  } catch (error) {
    console.error("Failed to insert dummy data:", error);
  }
};

// insertDummyData();

module.exports = {
  createFoodItem,
  updateFoodItem,
  listFoodItem,
  deleteFoodItem,
  listFoodItemByRestaurant,
};
