import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.post('/recover-password', usersController.recoverPassword);
router.post('/recover-password/:uid', isAuth, usersController.resetPassword);

export default router;
