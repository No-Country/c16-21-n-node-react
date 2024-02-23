import { prisma } from '../../../config/dbConnection.js';

const create = async (pet) => {
  const result = await prisma.pets.create({ data: pet });
  return result;
};

export { create };
