// wazir-glass-backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// High performance response compression middleware (Gzip/Brotli)
app.use(compression());

// Body parser middleware
app.use(express.json());

// Enable CORS (allows requests from your deployed frontend and localhost)
app.use(cors());

// Healthcheck & root endpoint
app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "Wazir Glass & Aluminium Backend API",
    time: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Mount routers
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));
app.use("/api/quotations", require("./routes/quotationRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
