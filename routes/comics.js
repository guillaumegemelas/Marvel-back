const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  let { limit, skip, title } = req.query;
  const apiKey = process.env.YOUR_API_KEY;

  if (!limit) {
    limit = 100;
  }
  if (skip) {
    skip = (skip - 1) * limit;
  }
  if (!title) {
    title = "";
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`
    );
    console.log(response.data); //renvoie la réponse globlale avec tableau d'objets pour la clé results
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/comics/:characterId", async (req, res) => {
  const charId = req.params.characterId;
  console.log(req.params); //renvoie { characterId: '5fc8ba1fdc33470f788f88b3' }
  console.log(charId); //renvoie '5fc8ba1fdc33470f788f88b3'

  const apiKey = process.env.YOUR_API_KEY;

  if (charId) {
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${charId}?apiKey=${apiKey}`
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
});

module.exports = router;
