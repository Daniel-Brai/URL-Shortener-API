const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path: './config/.env'})

// Here I am using my local MongoDB instance to connect to the database urlShortener
// if use plan on using it the web, use the environment variable in the configs folder
const connection = async() => {
    try { 
        await mongoose.connect(
            ( process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener" ), {
            useNewUrlParser: true,
        })
        console.info("Connected to MongoDB")
    } catch (e) {
        console.error("Error connecting to MongoDB", e)
        process.exit(1)
    }
}

module.exports = connection