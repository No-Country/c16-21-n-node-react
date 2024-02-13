import { prisma } from '../../config/dbConnection.js';
import { Router } from 'express';
import { uuid } from 'uuidv4';

const router = Router();

let newPet = {
  name: '',
  type: 'Dog',
  race: '',
  weight: 12,
  age: 6,
  photo: 'http://rocco.com',
  whenWasLost: '14/6/23',
  whenWasFound: '',
  gender: 'female',

  lostOrFound: 'lost',
  userId: '962c458c-cf0e-4e3c-8264-b963d755f702',
};

router.get('/', async (req, res) => {
  try {
    const result = await prisma.pet.findMany({});
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await prisma.pet.create({ data: { ...newPet } });
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete('/', async (req, res) => {
  try {
    const result = await prisma.pet.deleteMany();
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
