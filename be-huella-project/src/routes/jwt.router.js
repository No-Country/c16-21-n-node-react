import { Router } from 'express';
import * as jwtAccess from '../controllers/jwt.controller.js';

const router = Router();

router.post('/', jwtAccess.jwtCreate);
router.get('/checkToken', jwtAccess.checkToken);

export default router;
