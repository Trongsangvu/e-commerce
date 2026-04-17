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
  productController.create,
);

router.get(
  "/",
  // allTokenRequired,
  productController.list,
);

router.get(
  "/search",
  allTokenRequired,
  productController.searchProduct,
);

router.get(
  "/:id",
  allTokenRequired,
  productController.getById,
);

router.put(
  "/:id",
  adminTokenRequired,
  validateRequest(updateProductRequest),
  productController.update,
);

router.delete(
  "/:id",
  adminTokenRequired,
  productController.deleteProduct,
);

export default router;
