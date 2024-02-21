import { prisma } from '../../config/dbConnection.js';
import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();

const newUser = {
  username: 'max',
  email: 'max@test.com',
  password: '1234',
  phone: '1166603219',
  profilePic: 'maxpic.jpg',
  location: 'Vicente Lopez',
};
newUser.password = bcrypt.hashSync(newUser.password, 10);

router.get('/', async (req, res) => {
  try {
    const result = await prisma.users.findMany({ include: { pets: true } });
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    
    const result = await prisma.users.create({ data: { ...newUser } });
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

router.delete('/', async (req, res) => {
  try {
    const result = await prisma.users.deleteMany();
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

export default router;
