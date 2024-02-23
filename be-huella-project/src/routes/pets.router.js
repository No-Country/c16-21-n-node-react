import { Router } from 'express';
import * as petsController from '../controllers/pets.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.get('/', petsController.getAllPets);
router.get('/:pid', petsController.getPetById);
router.post('/', petsController.createPet);
router.put('/:pid', petsController.updatePet);
router.delete('/:pid', petsController.deletePet);

export default router;
