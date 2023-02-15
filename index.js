const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

//route simple en Get pour vérifier réponse de l'API
app.get("/", (req, res) => {
  axios.get("https://lereacteur-marvel-api.herokuapp.com/").then((response) => {
    console.log(response.data);
  });
  res.json({ message: "Hello" });
});

//route /comics qui renvoie
app.get("/comics", (req, res) => {
  axios
    .get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.YOUR_API_KEY}`
    )
    .then((response) => {
      console.log(response.data);
    });

  res.json({ message: "Hello" });
});

app.listen(3000, () => {
  console.log("Serveur started 😀");
});
