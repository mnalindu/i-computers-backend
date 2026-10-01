import express from "express";
import { createProduct } from "../controllers/productController.js";
import { getAllProducts } from "../controllers/productController.js";
import { deleteProduct } from "../controllers/productController.js";
import { updateProduct } from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);




export default productRouter ;
