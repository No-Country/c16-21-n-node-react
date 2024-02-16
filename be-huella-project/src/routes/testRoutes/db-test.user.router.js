import { prisma } from '../../config/dbConnection.js';
import { Router } from 'express';

const router = Router();

const newUser = {
  username: 'max',
  email: 'max@test.com',
  password: '1234',
  phone: '1166603219',
  profilePic: 'maxpic.jpg',
  location: 'Vicente Lopez',
};

router.get('/', async (req, res) => {
  try {
    const result = await prisma.user.findMany({});
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await prisma.user.create({ data: { ...newUser } });
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

router.delete('/', async (req, res) => {
  try {
    const result = await prisma.user.deleteMany();
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

export default router;
