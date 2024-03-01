import * as petsPrisma from '../dao/managers/prismaManager/pets.prisma.js';
import * as Errors from '../errors/custom-exeptions.js';
import { uploadImage } from '../middlewares/uploadImage.js';
import { userOwnsPet } from '../utils/utils.js';

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

const deletePet = async (pid, uid) => {
  const pet = await petsPrisma.getPetById(pid);
  if (!pet) throw new Errors.NotFound('Pet not found');
  userOwnsPet(pet, uid);
  const result = await petsPrisma.deletePet(pid);
  return result;
};

const updatePet = async (pid, newPet, image, uid) => {
  if (!pid) throw new Errors.BadRequest('Pet ID is required');
  if (!newPet) throw new Errors.BadRequest('An update is required');
  const petById = await petsPrisma.getPetById(pid);
  if (!petById) throw new Errors.NotFound('Pet not found');
  userOwnsPet(petById, uid);
  let uploadedImageUrl;
  if (image) uploadedImageUrl = await uploadImage(image);
  if ('necklace' in newPet) newPet.necklace = Boolean(newPet.necklace);
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
  Object.keys(pet).forEach((key) => {
    if (pet[key] === '' || pet[key] === undefined) {
      delete pet[key];
    }
  });
  if (pet.weight) pet.weight = Number(pet.weight);
  if (pet.age) pet.age = Number(pet.age);
  let when;
  if (!when) when = new Date().toISOString();

  const newPet = {
    ...pet,
    photo: uploadedImageUrl,
    when: when,
    userId: user.id,
    necklace: Boolean(pet.necklace),
  };
  const createdPet = await petsPrisma.createPet(newPet);
  return createdPet;
};

export { getAllPets, getPetById, deletePet, updatePet, createPet };
