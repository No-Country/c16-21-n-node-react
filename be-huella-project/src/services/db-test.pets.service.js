import { prisma } from '../config/dbConnection.js';
import * as Errors from '../errors/custom-exeptions.js';

const getAllPets = async () => {
  const result = await prisma.pets.findMany({});
  // const result = null;
  if (!result) throw new Errors.NotFound('Pets not found');
  return result;
};

const create = async (pet) => {
  if (!pet.name || !pet.location || !pet.type) {
    throw new Errors.BadRequest('All atributes are required');
  }
  const result = await database.create(pet);
  return result;
};

export { getAllPets, create };
