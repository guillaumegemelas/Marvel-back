const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
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

//ROUTE comics:
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

//ROUTE characters:
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});

app.listen(3000, () => {
  console.log("Serveur started 😀");
});
