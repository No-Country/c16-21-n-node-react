import { Router } from 'express';

import * as usersController from '../controllers/users.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();


router.post('/recover-password', usersController.recoverPassword);
router.post('/recover-password/:uid', isAuth, usersController.resetPassword);

router.get('/', userFunc.getAllUsers);
router.post('/update', isAuth, userFunc.userUpdate);
router.delete('/delete', isAuth, userFunc.userDelete);
router.post('/signin', userFunc.userCreate);
router.get('/find', userFunc.userFind);
router.get('/find/:id', userFunc.userFindId);


export default router;
