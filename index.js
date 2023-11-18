const express = require("express");
// const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

// mongoose.connect("mongodb://localhost/marvel");

const comicsRoutes = require("./routes/comicsRoutes");
const charactersRoutes = require("./routes/charactersRoutes");
app.use(comicsRoutes);
app.use(charactersRoutes);

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started !");
});
