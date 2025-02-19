import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', createProduct);
router.put('/:id', updateProduct);

export default router;