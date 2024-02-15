import { prisma } from '../../config/dbConnection.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    return res.json({'msg: {username} desde method Get': req.session.user});
});
  
  router.post('/', async (req, res) => {
    return res.json({'msg: {username} desde method Post': req.session.user});
  });
  
  export default router;