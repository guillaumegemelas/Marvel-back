const express = require("express");
const router = express.Router();

const Favourite = require("../models/Favourites");

//route1 pour ajouter des personnages en favoris

router.post("/addfavouritescharc", async (req, res) => {
  try {
    //ce qu'on reçoit en body du front
    const { image, name, token } = req.body;

    //déclaration new fav
    //declaration nouveau favori
    const newFavourite = new Favourite({
      name: name,
      image: image,
      token: token,
    });

    //vérif si le fav est déjà en base de données avec token ET name
    // pour être sure que chacun puisse ajouter favori (si valide que sur le nom, alors deux
    //user différents ne peuvent pas ajouter le meme favori car le nom existe deja en BDD)
    const newFavAlreadyAdded = await Favourite.findOne({ name, token });

    if (newFavAlreadyAdded) {
      return res.status(409).json({ message: "Favourite already added" });
    }
    //enregistrement nouveau fav en BDD
    await newFavourite.save();

    //déclaration réponse au client
    const clientResponse = {
      name: newFavourite.name,
      image: newFavourite.image,
    };
    console.log(clientResponse);
    //réponse
    res.status(200).json(clientResponse);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//route2 pour récupérer les favoris en get: requete ok postman--------------------------
router.get("/favourites", async (req, res) => {
  try {
    const favourites = await Favourite.find();
    console.log(favourites);
    res.json({ favourites: favourites });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
