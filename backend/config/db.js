// wazir-glass-backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wazir_glass";
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning: ${error.message}`);
    console.warn("⚠️  Server is running, but MongoDB is not connected yet. Please ensure your MongoDB instance is running or configure MONGO_URI in backend/.env");
  }
};

module.exports = connectDB;
