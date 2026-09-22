import { Router } from 'express';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller';

const router = Router();

// Rutas generales
router.post('/', createProduct);
router.get('/', getProducts);

// Rutas específicas que requieren el ID del producto
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;