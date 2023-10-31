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
      _id: "653a459ffa54376dd35d74db",
      name: "The Food Drama",
      address:
        "Besides Geetanjali Party Plot, near sterling cancer hospital Sindhu bhawan road Bodakdev, Ahmedabad, Bodakdev, West, Thaltej",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      geoLocation: {
        type: "Point",
        coordinates: [23.043901788432542, 72.51005618224643],
      },
    },
    {
      _id: "653a457137e0859d821f078f",
      name: "The Grand Bhagwati",
      address: "Circle, Dumas Rd, Magdalla",
      city: "Surat",
      state: "Gujarat",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      geoLocation: {
        type: "Point",
        coordinates: [21.136125029413698, 72.75115102934076],
      },
    },
    {
      _id: "653a48149ed56d34e008dcc0",
      name: "The Taj Mahal Palace",
      address: "Apollo Bandar, Colaba",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Mumbai_Aug_2018_%2843397784544%29.jpg/375px-Mumbai_Aug_2018_%2843397784544%29.jpg",
      geoLocation: {
        type: "Point",
        coordinates: [18.92179502024547, 72.83323498214824],
      },
    },
    {
      name: "Agashiye",
      address: "132 ft Ring Rd, Bodakdev, Ahmedabad, Gujarat 380054, India",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/1d/2a/41/0c/agashiye-lounge-and-garden.jpg",
      geoLocation: {
        type: "Point",
        coordinates: [23.02747694038113, 72.58172295341022],
      },
    },
    {
      name: "Aura - Courtyard by Marriott SBR",
      address:
        "Sindhubhavan Marg, PRL Colony, Bodakdev, Ahmedabad, Gujarat 380054",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/0b/5f/f8/21/havmor-restaurant-gurukul.jpg",
      geoLocation: {
        type: "Point",
        coordinates: [23.04026542022274, 72.50446735341058],
      },
    },
    {
      name: "The Fern Residency",
      address: "Near SG Highway, Ahmedabad, Gujarat 380054, India",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://r1imghtlak.mmtcdn.com/00f67faa5d1411ee87f20a58a9feac02.jpg?&output-quality=75&downsize=910:612&crop=910:612;4,0&output-format=jpg",
      geoLocation: {
        type: "Point",
        coordinates: [23.065376188904267, 72.58405498039694],
      },
    },
    {
      name: "The House of MG",
      address:
        "Bhadra Rd, Opp. Sidi, Old City, Gheekanta, Lal Darwaja, Ahmedabad, Gujarat 380001",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://r1imghtlak.mmtcdn.com/7002297aebd311ec9a990a58a9feac02.jpg?&output-quality=75&downsize=910:612&output-format=jpg",
      geoLocation: {
        type: "Point",
        coordinates: [23.027497814303377, 72.58179940923169],
      },
    },
    {
      name: "The Yellow Chilli",
      address:
        "Heritage Square, Gulbai Tekra Rd, Gulbai Tekra, Ahmedabad, Gujarat 380009",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image: "https://files.yappe.in/place/full/the-yellow-chilli-3448254.webp",
      geoLocation: {
        type: "Point",
        coordinates: [23.026794833000896, 72.55282239573889],
      },
    },
    {
      name: "Woodlands Drive-In",
      address:
        "Woodlands Restaurant, Galaxy High Street, near NH 48, Gunjan, Vapi, Gujarat 396195",
      city: "Vapi",
      state: "Gujarat",
      country: "India",
      image: "https://10619-2.s.cdn12.com/rests/original/341_503019927.jpg",
      geoLocation: {
        type: "Point",
        coordinates: [20.373836649785204, 72.92045031452656],
      },
    },
    {
      name: "Mango",
      address:
        "mango, Opp, NR Sindhu Bhavan Rd, PRL Colony, Bodakdev, Ahmedabad, Gujarat 380054",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-w/0e/c4/f2/61/photo1jpg.jpg",
      geoLocation: {
        type: "Point",
        coordinates: [23.039924270520483, 72.50196241811159],
      },
    },
    {
      name: "Gordhan Thal",
      address: "Thaltej, Ahmedabad, Gujarat 380054, India",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://b.zmtcdn.com/data/pictures/5/110145/637b3356631f70f7d8c492123363a049.jpg?output-format=webp",
      geoLocation: {
        type: "Point",
        coordinates: [23.03594121166207, 72.51116957788706],
      },
    },
    {
      name: "Mr & Mrs Somani",
      address:
        "Near Sardar Patel Stadium, Motera, Ahmedabad, Gujarat 380059, India",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://b.zmtcdn.com/data/pictures/3/111783/ad15dc6ae146db88d66928a4eacfe32d_featured_v2.jpg?output-format=webp",
      geoLocation: {
        type: "Point",
        coordinates: [23.04251600802261, 72.51446217077215],
      },
    },
    {
      name: "The Fern Residency",
      address:
        "Opposite Parimal Garden, Off S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380054, India",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      image:
        "https://r1imghtlak.mmtcdn.com/00f67faa5d1411ee87f20a58a9feac02.jpg?&output-quality=75&downsize=910:612&crop=910:612;4,0&output-format=jpg",
      geoLocation: {
        type: "Point",
        coordinates: [23.06521453537924, 72.5840978709866],
      },
    },
    {
      name: "Surat Marriott Hotel",
      address: "Ambika Niketan Road, Athwalines, Athwa, Surat, Gujarat 395007",
      city: "Surat",
      state: "Gujarat",
      country: "India",
      image:
        "https://pix8.agoda.net/hotelImages/10557879/0/a0f88dffea19004db04e0e95115fcd67.jpg?ce=0&s=1024x768",
      geoLocation: {
        type: "Point",
        coordinates: [21.17738638380631, 72.78987853446245],
      },
    },
    {
      name: "LEVVEL 5 (Terrace Restro)",
      address:
        "Royal Trade Centre, 515, Hazira - Adajan Rd, Jalaram Society, Adajan Gam, Adajan, Surat, Gujarat 395009",
      city: "Surat",
      state: "Gujarat",
      country: "India",
      image: "https://www.lemontreehotels.com/kimages/ltpcityPune.jpg",
      geoLocation: {
        type: "Point",
        coordinates: [21.186050931667364, 72.79435665763636],
      },
    },
    {
      name: "The Leela Palace Vadodara",
      address:
        "Near Polo Ground, Old Padra Rd, Vadodara, Gujarat 390007, India",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      image:
        "https://www.theleela.com/prod/content/assets/styles/tl_270_270_webp/public/2021-05/The-Leela-Palace-Jaipur_0.jpg.webp?VersionId=EPJ8QJdQzKiTwNQtH9S6vMl6ZRGkgX7A&itok=9XqQc7GO",
      geoLocation: {
        type: "Point",
        coordinates: [22.29360996974407, 73.191923042288],
      },
    },
    {
      name: "The Leela Gandhinagar",
      address:
        "The Leela Gandhinagar Sector-14 Airspace, state highway, above Railway Station, off Ahmedabad, Gandhinagar, Gujarat 382014",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      image:
        "https://r1imghtlak.mmtcdn.com/00f67faa5d1411ee87f20a58a9feac02.jpg?&output-quality=75&downsize=910:612&crop=910:612;4,0&output-format=jpg",
      geoLocation: {
        type: "Point",
        coordinates: [23.233700042080333, 72.62895252922343],
      },
    },
    {
      name: "Grand Mercure Vadodara Surya Palace",
      address: "R C Dutt Rd, Vadodara, Gujarat 390007, India",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      image: "https://www.ahstatic.com/photos/9278_ho_00_p_2048x1536.jpg",
      geoLocation: {
        type: "Point",
        coordinates: [22.307204012919538, 73.18386751106293],
      },
    },
    {
      name: "Peshawri Restaurant Vadodara",
      address: "Opp. Polo Ground, Akota, Vadodara, Gujarat 390020, India",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      image:
        "https://www.vivantahotels.com/content/dam/gateway/hotels/Akota-Gardens,Vadodara/images/gallery/VADODARA_Eat-&-Drink-for-Web_3x2-02.jpg/jcr:content/renditions/cq5dam.web.756.756.jpeg",
      geoLocation: {
        type: "Point",
        coordinates: [22.310031757370304, 73.16729703149025],
      },
    },
    {
      name: "Vivanta Vadodara",
      address:
        "Opp. Akota Stadium, Near Alkapuri, Vadodara, Gujarat 390020, India",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      image:
        "https://www.vivantahotels.com/content/dam/gateway/hotels/Akota-Gardens,Vadodara/images/gallery/VADODARA_Eat-&-Drink-for-Web_3x2-04.jpg/jcr:content/renditions/cq5dam.web.756.756.jpeg",
      geoLocation: {
        type: "Point",
        coordinates: [22.29346803790216, 73.17486380867489],
      },
    },
    {
      name: "The Fern Residency Rajkot",
      address: "Near Rajkot Airport, Rajkot, Gujarat 360005, India",
      city: "Rajkot",
      state: "Gujarat",
      country: "India",
      image:
        "https://r1imghtlak.mmtcdn.com/00f67faa5d1411ee87f20a58a9feac02.jpg?&output-quality=75&downsize=910:612&crop=910:612;4,0&output-format=jpg",
      geoLocation: {
        type: "Point",
        coordinates: [22.306297310447086, 70.81232395349242],
      },
    },
  ];

  try {
    await Restaurant.insertMany(sampleData);
    console.log("Sample data inserted");
  } catch (error) {
    console.log(error);
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
