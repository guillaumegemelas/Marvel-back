const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

//route simple en Get pour vérifier réponse de l'API
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/"
    );
    console.log(response.data);
    res.json({ message: "Hello, you are on home page" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//

//route /comics qui renvoie
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.YOUR_API_KEY}`
    );

    // console.log(response); //renvoie la réponse globlale avec tableau d'objets pour la clé results
    // console.log(response.data.count); //renvoie le nombre de Comics
    // console.log(response.data.limit); //renvoie la limite par page
    // console.log(response.data.results); //renvoie un tableau de résultats
    // console.log(response.data.results[1].title); //renvoie au titre de l'élément 1 de l'objet results

    //réponse du serveur avec le tableau d'objet global (count, limit et results)
    // res.status(200).json(response.data);

    ////réponse du serveur avec le tableau d'objet results
    res.status(200).json(response.data.results);
    //
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//

//seconde route characterId:
app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/:characterId?apiKey=${process.env.YOUR_API_KEY}`
    );
    console.log(req.params); //renvoie { characterId: '5fc8ba1fdc33470f788f88b3' }
    console.log(response); //renvoie la réponse globlale avec tableau d'objets pour la clé results

    res.status(200).json(response.config);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//

app.listen(3000, () => {
  console.log("Serveur started 😀");
});
