import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';

// Las rutas concentran el mapeo entre URL y la función del controlador que la atiende
const router = Router();

// Cada método de Express corresponde a un verbo HTTP
router.get('/', getProducts); // GET    /api/products
router.get('/:id', getProductById); // GET    /api/products/:id
router.post('/', createProduct); // POST   /api/products
router.put('/:id', updateProduct); // PUT    /api/products/:id
router.delete('/:id', deleteProduct); // DELETE /api/products/:id

export default router;