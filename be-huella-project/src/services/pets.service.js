import * as petsPrisma from '../dao/managers/prismaManager/pets.prisma.js';
import { prisma } from '../config/dbConnection.js';
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

const deletePet = async (pid) => {
  const pet = await petsPrisma.getPetById(pid);
  if (!pet) throw new Errors.NotFound('Pet not found');
  const result = await petsPrisma.deletePet(pid);
  return result;
};

const updatePet = async (pid, newPet) => {
  if (!pid) throw new Errors.BadRequest('Pet ID is required');
  if (!newPet) throw new Errors.BadRequest('An update is required');
  const petById = await petsPrisma.getPetById(pid);
  if (!petById) throw new Errors.NotFound('Pet not found');
  const updatedPet = { ...petById, ...newPet };
  console.log(updatedPet);
  const result = await petsPrisma.updatePet(updatedPet);
  return result;
};

export { getAllPets, getPetById, deletePet, updatePet };
