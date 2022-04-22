const express = require('express');
const { nanoid } = require('nanoid');
const dotenv = require('dotenv')
const ShortUrlRouter = express.Router();

// importing the DB model from the models folder
const Url = require('../model/url')

// importing the url validator from the utils folder
const utils = require('../validator/validateUrl')

// using the enviroment variables
dotenv.config({ path: '../config/.env' });

// post route
ShortUrlRouter.post('/', async (req, res) => {
  const longUrl = req.body.longUrl;
  const baseUrl = process.env.BASE_URL;

  const urlId = nanoid(7)

  if (utils.validateUrl(longUrl)) {

    try {
      let url = await Url.findOne({ longUrl: longUrl});

      if (url) {
        return res.status(200).json(url);
      } 
      else {
        const shortUrl = `${baseUrl}/${urlId}`;

        url = new Url({
          longUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        return res.status(201).json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Unable to resolve url');
    }

  } else {
    res.status(400).json('Invalid Original Url');
  }

});

module.exports = ShortUrlRouter;