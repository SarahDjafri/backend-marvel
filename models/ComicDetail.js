const mongoose = require("mongoose");

const ComicDetail = mongoose.Schema("ComicDetail", {
  thumbnail: {
    path: String,
    extension: String,
  },
  comics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comic",
    },
  ],
  name: String,
  description: String,
  _id: String,
});

module.exports = ComicDetail;
