// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import ProductRoute from "./routes/product.route.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.listen( port , () => {
  connectToDatabase();
  console.log(`Server started on http://localhost:${port}`);
});

app.use(express.json());

app.use("/api/products", ProductRoute);



