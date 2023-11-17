const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const { title, page, limit } = req.query;

    let pageToSend = 1;
    if (page) {
      pageToSend = parseInt(page);
    }
    const limitN = parseInt(limit) || 100;

    const skip = (pageToSend - 1) * limitN;

    const apiKey = process.env.MARVEL_API_KEY;
    const apiUrl = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&limit=${limitN}&skip=${skip}&title=${title}`;
    const response = await axios.get(apiUrl);
    const comicsFromAPI = response.data.results;

    res.status(200).json({ comics: comicsFromAPI });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
