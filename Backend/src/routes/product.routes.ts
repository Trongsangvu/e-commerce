import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { searchProduct } from "../controllers/product.controller";
import { isAdmin } from "../middleware/index";
import { validateToken } from "../utils/jwt";
const router = express.Router();

router.post("/", validateToken, isAdmin, createProduct);
router.get("/", getProducts);
router.get("/search", searchProduct);

router.get("/:id", getProductById);
router.put("/:id", validateToken, isAdmin, updateProduct);
router.delete("/:id", validateToken, isAdmin, deleteProduct);

export default router;
