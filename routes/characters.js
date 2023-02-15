const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  let { limit, skip, title } = req.query;

  const apiKey = process.env.YOUR_API_KEY;

  if (!limit) {
    limit = "";
  }
  if (!skip) {
    skip = "";
  }
  if (!title) {
    title = "";
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`
    );
    console.log(response);
    //réponse du serveur avec le tableau d'objet global (count, limit et results)
    // res.status(200).json(response.data);

    ////réponse du serveur avec le tableau d'objet results
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//
//
// ROUTE 4: /character/:characterId------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/character/:characterId", async (req, res) => {
  const thencharId = req.params.characterId;
  console.log(req.params); //
  console.log(thencharId); //

  const apiKey = process.env.YOUR_API_KEY;

  if (thencharId) {
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${thencharId}?apiKey=${apiKey}`
      );
      console.log(req.params);
      console.log(response);

      ////réponse du serveur avec un objet {thumbnail, comics, id, name, description et V}
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
});

module.exports = router;
