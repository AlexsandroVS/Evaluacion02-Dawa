import express from 'express';
import upload from '../middlewares/upload.js';
import {
  listProducts,
  createProductController,
  updateProductController,
  deleteProductController,
  patchProductController
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', listProducts);
router.post('/', upload.single('image'), createProductController);
router.put('/:id', upload.single('image'), updateProductController);
router.delete('/:id', deleteProductController);
router.patch('/:id', upload.single('image'), patchProductController);


export default router;
