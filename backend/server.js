// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import ProductRoute from "./routes/product.route.js";
import path from "path";

dotenv.config();

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();
app.listen(port, () => {
  connectToDatabase();
  console.log(`Server started on http://localhost:${port}`);
});

app.use(express.json());

app.use("/api/products", ProductRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}
