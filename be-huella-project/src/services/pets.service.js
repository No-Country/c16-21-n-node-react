import * as petsPrisma from '../dao/managers/prismaManager/pets.prisma.js';
import * as Errors from '../errors/custom-exeptions.js';
import { uploadImage } from '../middlewares/uploadImage.js';

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

const updatePet = async (pid, newPet, image) => {
  if (!pid) throw new Errors.BadRequest('Pet ID is required');
  if (!newPet) throw new Errors.BadRequest('An update is required');
  const petById = await petsPrisma.getPetById(pid);
  if (!petById) throw new Errors.NotFound('Pet not found');
  const uploadedImageUrl = await uploadImage(image);
  newPet.necklace = Boolean(newPet.necklace);
  if (newPet.weight) newPet.weight = Number(newPet.weight);
  if (newPet.age) newPet.age = Number(newPet.age);

  const updatedPet = {
    ...petById,
    ...newPet,
    ...(image && { photo: uploadedImageUrl }),
  };

  const result = await petsPrisma.updatePet(updatedPet);
  return result;
};

const createPet = async (pet, image, user) => {
  if (
    !pet.type ||
    // !pet.when ||
    !pet.gender ||
    !pet.necklace ||
    !pet.lostOrFound ||
    !pet.location ||
    !image
  )
    throw new Errors.BadRequest('Required fields missing');
  const uploadedImageUrl = await uploadImage(image);
  const when = new Date().toISOString();
  const newPet = {
    ...pet,
    photo: uploadedImageUrl,
    when: when,
    userId: user,
    necklace: Boolean(pet.necklace),
  };
  const createdPet = await petsPrisma.createPet(newPet);
  return createdPet;
};

export { getAllPets, getPetById, deletePet, updatePet, createPet };
