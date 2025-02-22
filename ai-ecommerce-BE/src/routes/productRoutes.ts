import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product/productController';

const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', createProduct);
router.put('/:id', updateProduct);

router.delete(':/id', deleteProduct);

export default router;