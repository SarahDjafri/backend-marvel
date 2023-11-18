const express = require("express");
const axios = require("axios");
// const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

// mongoose.connect("mongodb://localhost/marvel");

const comicsRoutes = require("./routes/comicsRoutes");
const charactersRoutes = require("./routes/charactersRoutes");
app.use(comicsRoutes);
app.use(charactersRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started !");
});
