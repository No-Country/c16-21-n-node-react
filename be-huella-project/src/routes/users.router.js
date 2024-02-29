import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import * as usersController from '../controllers/users.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.post('/recover-password', usersController.recoverPassword);
router.post('/recover-password/:uid', isAuth, usersController.resetPassword);

router.get('/', usersController.getAllUsers);
router.put('/update', isAuth, upload, usersController.userUpdate);
router.delete('/delete', isAuth, usersController.userDelete);
router.post('/signin', upload, usersController.userCreate);
router.get('/find', usersController.userFind);
router.get('/find/:uid', usersController.userFindId);

export default router;
