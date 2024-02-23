import { Router } from 'express';
import * as petsController from '../controllers/pets.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.get('/', petsController.getAllPets);
router.get('/:pid', isAuth, petsController.getPetById);
router.post('/', isAuth, petsController.createPet);
router.put('/:pid', isAuth, petsController.updatePet);
router.delete('/:pid', isAuth, petsController.deletePet);

export default router;
