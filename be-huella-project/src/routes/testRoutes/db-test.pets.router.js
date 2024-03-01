import { Router } from 'express';
import * as petsController from '../../controllers/db-test.pets.controller.js';
import { isAuth } from '../../middlewares/isAuth.js';
const router = Router();

router.get('/', petsController.getAllPets);

router.post('/', isAuth, petsController.create);

export default router;
