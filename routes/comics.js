const express = require("express");
const router = express.Router();
const axios = require("axios");

//ROUTE 1:
router.get("/comics", async (req, res) => {
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
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`
    );
    // console.log(response); //renvoie la réponse globlale avec tableau d'objets pour la clé results
    // console.log(response.data.count); //renvoie le nombre de Comics
    // console.log(response.data.limit); //renvoie la limite par page
    // console.log(response.data.results); //renvoie un tableau de résultats
    // console.log(response.data.results[1].title); //renvoie au titre de l'élément 1 de l'objet results

    //réponse du serveur avec le tableau d'objet results
    // res.status(200).json(response.data.results);
    ////réponse du serveur avec le tableau d'objet  global (count, limit et results)
    res.status(200).json(response.data);
    //
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//ROUTE 2
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

      // console.log(response); //renvoie la réponse globlale avec tableau d'objets pour la clé results

      // res.status(200).json(response.config);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
});

module.exports = router;
