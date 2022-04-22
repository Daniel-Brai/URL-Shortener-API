const express = require("express");
const dotenv = require("dotenv");
const Url = require("../model/url");

// using the enviroment variables
dotenv.config({ path: '../config/.env' });

const getShortenUrlRoute = express.Router();

// Get a shorten URL for the url inputed
getShortenUrlRoute.get('/:shortUrl', async (req, res) => {
    const shortUrlCode = req.params.shortUrl;
    const url = await Url.findOne({ urlId: shortUrlCode });

    try {
        if (url) {
          let clickCount = url.clickCount;
          if(clickCount >= process.env.DEFAULT_CLICKS){
              console.log("The click count for shortcode " + shortUrlCode + " has passed the limit of " + process.env.DEFAULT_CLICKS);
              return res.status(400).json("The click count for shortcode " + shortUrlCode + " has passed the limit of " + process.env.DEFAULT_CLICKS);
          }
          clickCount++;

          await url.update({ clickCount });
          return res.status(308).redirect(url.longUrl);

        } 
        else {
          return res.status(404).json("Your shortened url doesn't exist in the system.");
        }
    }
    catch (err) {
      console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
      return res.status(500).json("There is some internal error.");
    }
})

module.exports = getShortenUrlRoute;