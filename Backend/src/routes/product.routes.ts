import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product/product.controller';
import { searchProduct } from '../controllers/product/search.controller';
import { isAdmin } from '../middleware/index';
import { validateToken } from '../utils/validation/jwt';
const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/search', searchProduct);
router.get('/:id', getProductById);

// Private
router.post('/', validateToken, isAdmin, createProduct);
router.put('/:id', validateToken, isAdmin, updateProduct);

router.delete('/:id', validateToken, isAdmin, deleteProduct);

export default router;