import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  searchProduct,
  updateProduct,
} from "../controllers/product.controller";
import { adminTokenRequired } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/", adminTokenRequired, createProduct);
router.get("/", getProducts);
router.get("/search", searchProduct);

router.get("/:id", getProductById);
router.put("/:id", adminTokenRequired, updateProduct);
router.delete("/:id", adminTokenRequired, deleteProduct);

export default router;
