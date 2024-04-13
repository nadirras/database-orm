import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export { productRouter };
