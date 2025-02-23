import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product/productController';
import { validateToken, isAdmin } from '../middleware/index';

const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Private
router.post('/', validateToken, isAdmin, createProduct);
router.put('/:id', validateToken, isAdmin, updateProduct);

router.delete('/:id', validateToken, isAdmin, deleteProduct);

export default router;