import { prisma } from '../config/dbConnection.js';
import * as Errors from '../errors/custom-exeptions.js';

const getAllPets = async () => {
  const result = await prisma.pets.findMany({});
  // const result = null;
  if (!result) throw new Errors.NotFound('Pets not found');
  return result;
};

export { getAllPets };
