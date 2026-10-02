// wazir-glass-backend/config/db.js
const mongoose = require("mongoose");
const User = require("../models/userModel");

const seedAdminUser = async () => {
  try {
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const username = process.env.ADMIN_USERNAME || "admin";
      const password = process.env.ADMIN_PASSWORD || "admin123";
      await User.create({ username, password });
      console.log(`✅ Default admin account initialized:`);
      console.log(`   Username: ${username}`);
      console.log(`   Password: ${password}`);
    }
  } catch (err) {
    console.error(`Admin seeder error: ${err.message}`);
  }
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wazir_glass";
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // Automatically ensure admin account exists
    await seedAdminUser();
  } catch (error) {
    console.error(`MongoDB Connection Warning: ${error.message}`);
    console.warn("⚠️  Server is running, but MongoDB is not connected yet. Please ensure your MongoDB instance is running or configure MONGO_URI in backend/.env");
  }
};

module.exports = connectDB;
