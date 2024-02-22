import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';

const router = Router();

router.post('/recover-password', usersController.recoverPassword);
router.post('/recover-password/:uid', usersController.resetPassword);

export default router;
