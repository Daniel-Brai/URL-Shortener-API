const express = require("express");
const connectDB = require("./connection/DB");
const dotenv = require('dotenv');
const shortUrlRoute = require("./routes/makeShorturl")
const shortenedUrlRoute = require("./routes/getShorturl")

// using the enviroment variables
dotenv.config({ path: '../config/.env' });

// instantiating an express app
const app = express();

// connect to the mongodb instance
connectDB();

//using middleware for handling parsing data in the body
app.use(express.json({}));

// For redirecting the app to use these routes.
app.use("/api/", shortenedUrlRoute)
app.use("/api/shorturl", shortUrlRoute);

const PORT = 4000 || process.env.PORT;

// Express server 
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}....`)
})

