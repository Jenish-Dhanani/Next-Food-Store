const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const mongoDBUrl = process.env.MONGO_URL;
    if (!mongoDBUrl) {
      throw new Error("MONGO DB URL NOT FOUND");
    }

    const connectionObject = await mongoose.connect(mongoDBUrl);

    console.log(`MongoDB Connected: ${connectionObject.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
    throw error;
  }
};

module.exports = {
  connectToMongoDB,
};
