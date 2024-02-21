import { Router } from 'express';
import * as petsController from '../../controllers/db-test.pets.controller.js';
import { isAuth } from '../../middlewares/isAuth.js';
const router = Router();

router.get('/', isAuth, petsController.getAllPets);

// router.post('/', async (req, res, next) => {
//   try {
//     const { name } = req.body;

//     if (!name) {
//       next(ApiError.badRequest('All required values must be completed'));
//       return;
//     }
//     console.log(name);
//     // const result = await prisma.pets.create({ data: { ...newPet } });
//     return res.status(200).json(name);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// router.delete('/', async (req, res) => {
//   try {
//     const result = await prisma.pets.deleteMany();
//     return res.json(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

export default router;
