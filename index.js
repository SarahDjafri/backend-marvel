const express = require("express");
const axios = require("axios");
const corsMiddleware = require("./middleware/cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(corsMiddleware);

mongoose.connect(process.env.MONGODB_URI);

const userRoutes = require("./routes/userRoutes");
const comicsRoutes = require("./routes/comicsRoutes");
const charactersRoutes = require("./routes/charactersRoutes");
app.use(comicsRoutes);
app.use(charactersRoutes);
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started !");
});
