import express from "express";
import productController from "../controllers/product.controller";
import { adminTokenRequired, allTokenRequired } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { createProductRequest, updateProductRequest } from "../requests/product.request";
const router = express.Router();

router.post(
  "/",
  adminTokenRequired,
  validateRequest(createProductRequest),
  productController.createProduct,
);

router.get(
  "/",
  allTokenRequired,
  productController.getProducts,
);

router.get(
  "/search",
  allTokenRequired,
  productController.searchProduct,
);

router.get(
  "/:id",
  allTokenRequired,
  productController.getProductById,
);

router.put(
  "/:id",
  adminTokenRequired,
  validateRequest(updateProductRequest),
  productController.updateProduct,
);

router.delete(
  "/:id",
  adminTokenRequired,
  productController.deleteProduct,
);

export default router;
