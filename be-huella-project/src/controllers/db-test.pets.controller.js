import { prisma } from '../config/dbConnection.js';
import * as Errors from '../errors/custom-exeptions.js';
const getAllPets = async (req, res, next) => {
  try {
    const result = await prisma.pets.findMany({});

    if (!result) {
      throw new Errors.NotFound('Not found');
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { getAllPets };
