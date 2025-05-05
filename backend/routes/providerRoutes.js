import express from 'express';
import {
  listProviders,
  getProvider,
  createProviderController,
  updateProviderController,
  deleteProviderController
} from '../controllers/providerController.js';

const router = express.Router();

router.get('/', listProviders);
router.get('/:id', getProvider);
router.post('/', createProviderController);
router.put('/:id', updateProviderController);
router.delete('/:id', deleteProviderController);

export default router;
