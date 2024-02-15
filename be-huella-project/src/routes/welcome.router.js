import { prisma } from '../../config/dbConnection.js';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.send('msg: {username} desde method Get');
});
  
  router.post('/', (req, res) => {
    return res.send('msg: {username} desde method Post');
  });
  
  export default router;