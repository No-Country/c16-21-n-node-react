import { prisma } from '../../../config/dbConnection.js';

const createPet = async (pet) => {
  const result = await prisma.pets.create({ data: { ...pet } });
  return result;
};

const getAllPets = async (params) => {
  
  let queryParams = {};
  if (params) {
    const { race, type, gender, location, lostOrFound } = params;

    if (race !== '' && race !== 'all' && race !== undefined) {
      queryParams.where = { race };
    }

    if (type  !== '' && type !== 'all' && race !==undefined) {
      queryParams.where = { ...queryParams.where, type };
    }

    if (gender !== '' && gender !== 'all' && gender !== undefined) {
      queryParams.where = { ...queryParams.where, gender };
    }

    if (location !== '' && location !== 'all' && location !== undefined) {
      queryParams.where = { ...queryParams.where, location };
    }

    if (lostOrFound !== '' && lostOrFound !== 'all' && lostOrFound !== undefined) {
      queryParams.where = { ...queryParams.where, lostOrFound };
    }    
  }
  
  const result = await prisma.pets.findMany(queryParams);
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

export { createPet, getAllPets, getPetById, deletePet, updatePet };
