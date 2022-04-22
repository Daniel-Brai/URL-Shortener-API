const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl: { 
        type: String,
        required: true,
    },
    shortUrl: { 
        type: String,
    },
    urlId: { 
        type: String,
    },
    clickCount: { 
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("Url", urlSchema);
