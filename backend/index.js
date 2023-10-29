//packages imports
const express = require("express");
const cors = require("cors");

//setup express app
const app = express();

// custom imports
const { connectToMongoDB } = require("./utils/db.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const indexRouter = require("./routes/index.js");

//dot env config
require("dotenv").config();

//connect to mongodb first
connectToMongoDB();

//cors middleware
app.use(cors());
app.use(express.json());

//main route
app.use("/api/v1", indexRouter);

//error handling middleware
app.use(notFound);
app.use(errorHandler);

//starting app
app.listen(process.env.PORT || 5000, async () => {
  console.log(`Server running on port: ${process.env.PORT || 5000}`);
});
