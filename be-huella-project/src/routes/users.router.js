import { Router } from 'express';

import * as usersController from '../controllers/users.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();


router.post('/recover-password', usersController.recoverPassword);
router.post('/recover-password/:uid', isAuth, usersController.resetPassword);

router.get('/', usersController.getAllUsers);
router.post('/update', isAuth, usersController.userUpdate);
router.delete('/delete', isAuth, usersController.userDelete);
router.post('/signin', usersController.userCreate);
router.get('/find', usersController.userFind);
router.get('/find/:id', usersController.userFindId);


export default router;
