const mongoose = require("mongoose");

const Character = mongoose.model("Character", {
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
  _id: String,
  name: String,
  description: String,
});

module.exports = Character;
