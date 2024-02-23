import * as petsPrisma from '../dao/managers/prismaManager/pets.prisma.js';
import { userOwnsPet } from '../utils/utils.js';
import * as Errors from '../errors/custom-exeptions.js';

const getAllPets = async () => {
  const pets = await petsPrisma.getAllPets();
  if (!pets) throw new Errors.NotFound('Any pets in the database');
  return pets;
};
const getPetById = async (pid) => {
  const pet = await petsPrisma.getPetById(pid);
  if (!pet) throw new Errors.NotFound('Pet not found');
  return pet;
};

const deletePet = async (pid, user) => {
  const pet = await petsPrisma.getPetById(pid);
  userOwnsPet(user, pet);
  if (!pet) throw new Errors.NotFound('Pet not found');
  const result = await petsPrisma.deletePet(pid);
  return result;
};

const updatePet = async (pid, newPet, uid) => {
  if (!pid) throw new Errors.BadRequest('Pet ID is required');
  if (!newPet) throw new Errors.BadRequest('An update is required');
  const petById = await petsPrisma.getPetById(pid);
  userOwnsPet(uid, petById);
  if (!petById) throw new Errors.NotFound('Pet not found');
  const updatedPet = { ...petById, ...newPet };
  console.log(updatedPet);
  const result = await petsPrisma.updatePet(updatedPet);
  return result;
};

const createPet = async (pet, user) => {
  if (
    !pet.type ||
    !pet.photo ||
    !pet.gender ||
    pet.necklace === undefined ||
    !pet.lostOrFound ||
    !pet.location
  )
    throw new Errors.BadRequest('Missing required values');
  let when = new Date();
  const newPet = { ...pet, userId: user, when: when };
  const result = await petsPrisma.create(newPet);
  return result;
};

export { getAllPets, getPetById, deletePet, updatePet, createPet };
