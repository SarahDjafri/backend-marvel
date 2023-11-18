const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    const { title, page, limit } = req.query;

    let pageToSend = 1;
    if (page) {
      pageToSend = parseInt(page);
    }
    const limitN = parseInt(limit) || 100;

    const skip = (pageToSend - 1) * limitN;

    const apiKey = process.env.MARVEL_API_KEY;
    const apiUrl = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limitN}&skip=${skip}&title=${title}`;
    const response = await axios.get(apiUrl);
    const comicsFromAPI = response.data.results;

    res.status(200).json({ comics: comicsFromAPI });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/comics/character/:characterId", async (req, res) => {
  try {
    const comicCharacterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${comicCharacterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    const comicCharacter = response.data;
    res.status(200).json(comicCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/comics/:id", async (req, res) => {
  try {
    const comicId = req.params.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    const comic = response.data;
    // console.log(comic);
    res.status(200).json(comic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
