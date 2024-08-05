// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import Product from "./models/products.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.listen(3000, () => {
  connectToDatabase();
  console.log(" Server started on http://localhost:3000");
});

app.use(express.json());

app.get("/api/products", async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    } 
});

app.post("/api/products", (req, res) => {
  const product = req.body;
  console.log(product);
  if (!product.name || !product.price || !product.image) {
    res
      .status(400)
      .send.json({ success: false, message: "All fields are required" });
  }
  const newProduct = new Product(product);

  try {
    newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error.message);
  }
});

app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try{
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully', data: product});
    } catch (error) {
        return res.status(404).json({success: false, message: 'Product not found'});
    }
});

app.put("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('No product with that id');
    } 

    try{
        const updatedProduct  = await Product.findByIdAndUpdate(id, product , {new: true});
        res.status(200).json({success: true, message: 'Product updated successfully', data: updatedProduct});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }

});