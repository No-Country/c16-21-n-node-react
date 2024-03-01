import { Router } from 'express';
import * as petsController from '../controllers/pets.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
const router = Router();

router.get('/', petsController.getAllPets);
router.get('/:pid', petsController.getPetById);
router.post('/', isAuth, upload, petsController.createPet);
router.put('/:pid', upload, petsController.updatePet);
router.delete('/:pid', petsController.deletePet);

export default router;
