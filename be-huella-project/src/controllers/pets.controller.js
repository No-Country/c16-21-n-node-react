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
  } catch (error) {
    next(error);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const result = await petsService.deletePet(pid);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createPet = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export { getAllPets, getPetById, createPet, deletePet, updatePet };
