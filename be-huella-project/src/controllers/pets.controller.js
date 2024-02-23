import * as petsService from '../services/pets.service.js';

const getAllPets = async (req, res, next) => {
  try {
    const result = await petsService.getAllPets();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getPetById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const result = await petsService.getPetById(pid);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updatePet = async (req, res, next) => {
  try {
    const pet = req.body;
    const { pid } = req.params;
    const user = req.user;
    const result = await petsService.updatePet(pid, pet, user);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const user = req.user;
    const result = await petsService.deletePet(pid, user);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createPet = async (req, res, next) => {
  try {
    const pet = req.body;
    const user = req.user;
    console.log(user);
    const result = await petsService.createPet(pet, user);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export { getAllPets, getPetById, createPet, deletePet, updatePet };
