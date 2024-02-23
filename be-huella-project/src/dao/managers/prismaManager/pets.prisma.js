import { prisma } from '../../../config/dbConnection.js';

const create = async (pet) => {
  const result = await prisma.pets.create({ data: { ...pet } });
  return result;
};

const getAllPets = async () => {
  const result = await prisma.pets.findMany({});
  return result;
};

const getPetById = async (pid) => {
  const result = await prisma.pets.findUnique({ where: { id: pid } });
  return result;
};

const deletePet = async (pid) => {
  const result = await prisma.pets.delete({ where: { id: pid } });
  if (!result) throw new Errors.NotFound('Pet not found');
  return result;
};

const updatePet = async (pet) => {
  const result = await prisma.pets.update({
    where: { id: pet.id },
    data: {
      ...pet,
    },
  });
  return result;
};

export { create, getAllPets, getPetById, deletePet, updatePet };
