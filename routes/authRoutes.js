const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const makeToken = id => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "1d" });

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password must contain at least 6 characters" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({
      name, email, password: await bcrypt.hash(password, 10)
    });

    res.status(201).json({
      message: "Registration successful",
      token: makeToken(user._id.toString()),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password || "", user.password)))
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      message: "Login successful",
      token: makeToken(user._id.toString()),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

module.exports = router;