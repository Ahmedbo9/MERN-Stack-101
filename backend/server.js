// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import ProductRoute from "./routes/product.route.js";

dotenv.config();

const app = express();
app.listen(3000, () => {
  connectToDatabase();
  console.log(" Server started on http://localhost:3000");
});

app.use(express.json());

app.use("/api/products", ProductRoute);



