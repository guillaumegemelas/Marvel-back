const mongoose = require("mongoose");

const FavouriteCom = mongoose.model("FavouriteCom", {
  image: String,
  token: String,
});

module.exports = FavouriteCom;
