const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const studentRoutes = require("./routes/studentRoutes.js");
const libraryRoutes = require("./routes/libraryRoutes.js");
const feesRoutes = require("./routes/feesRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

const { verifyToken } = require("./middleware/authMiddleware.js");


const app = express();

// Load environment variables
dotenv.config();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/", authRoutes,studentRoutes, libraryRoutes, feesRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB()
 



