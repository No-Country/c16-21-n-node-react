import { Router } from 'express';
import * as petsController from '../controllers/pets.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
const router = Router();

router.get('/', petsController.getAllPets);
router.get(
  '/find/:race?/:type?/:gender?/:location?/:lostOrFound?',
  petsController.getAllPetsFilter
);
router.get('/:pid', isAuth, petsController.getPetById);
router.get('/details/:pid', petsController.getPetById);
router.post('/create', isAuth, upload, petsController.createPet);
router.put('/update/:pid', upload, isAuth, petsController.updatePet);
router.delete('/delete/:pid', isAuth, petsController.deletePet);

export default router;
