import { Router } from 'express';
import * as jwtAccess from '../controllers/jwt.controllers.js';

const router = Router();

router.post('/', jwtAccess.jwtCreate);
router.get('/checkToken', jwtAccess.checkToken);

export default router;