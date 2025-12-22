//import dns from "dns";
//dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
dotenv.config();


import https from "https";
import axios from "axios";

const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
});

axios.defaults.httpsAgent = agent;


console.log("Loaded ENV Keys:", {
  mongo: process.env.MONGO_URI ? "OK" : "MISSING",
  tmdb: process.env.TMDB_ACCESS_TOKEN ? "OK" : "MISSING",
  books: process.env.GOOGLE_BOOKS_API_KEY ? "OK" : "MISSING",
});


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
import authRoutes from "./routes/authRoutes.js";
const RecommendationRoutes = require("./routes/RecommendationRoutes");



const app = express();
app.use(cors());
app.use(express.json());

//Mongoose Connection 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.error("MongoDB Connection Error:",err));

//Routes 
app.use("/api/auth", authRoutes);

//recommendation
app.use("/api/recommend",RecommendationRoutes);

//Test Route
app.get("/",(req,res) => {
    res.send("Auraverse Backend is running")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));