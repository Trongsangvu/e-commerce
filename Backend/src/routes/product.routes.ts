import express from "express";
import productController from "../controllers/product.controller";
import { adminTokenRequired } from "../middlewares/auth.middleware";
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
  productController.list,
);

router.get(
  "/:id",
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
