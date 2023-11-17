const mongoose = require("mongoose");

const Comic = mongoose.model("Comic", {
  thumbnail: {
    path: String,
    extension: String,
  },
  _id: String,
  title: String,
  description: String,
});

module.exports = Comic;
