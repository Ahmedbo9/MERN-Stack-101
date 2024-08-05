import express from "express";
const router = express.Router();
import { createProduct, getProducts, deleteProduct , updateProduct } from "../controllers/product.controller.js";

router.get("/", getProducts);

router.post("/",createProduct) 
 
router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct );

export default router;
