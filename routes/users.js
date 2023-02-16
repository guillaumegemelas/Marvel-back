const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameter" });
    }
    //il faut qu'on renvoie un message d'erreur si l'email est déjà utilisé

    const emailAlreadyUsed = await User.findOne({ email });

    if (emailAlreadyUsed) {
      return res.status(409).json({ message: "This email is already used" });
    }

    const usernameAlreadyUsed = await User.findOne({ username });
    if (usernameAlreadyUsed) {
      return res.status(409).json({ message: "This username is already used" });
    }

    const newUser = new User({
      email: email,
      username: username,
    });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized email" });
    }

    // const userPass = await User.findOne({ password: password });
    // if (!userPass) {
    //   return res.status(401).json({ message: "Unauthorized password" });
    // }

    res.json({ _id: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
