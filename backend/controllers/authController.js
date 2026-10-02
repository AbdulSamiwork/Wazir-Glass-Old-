// wazir-glass-backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Generates a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "wazir_glass_jwt_secret_2026", {
    expiresIn: "30d",
  });
};

// @desc    Authenticate/Login admin user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  try {
    // Check for user by username
    const user = await User.findOne({ username });

    // Check user and password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

// @desc    Register a new admin user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({ username, password });
    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

module.exports = { loginUser, registerUser };
