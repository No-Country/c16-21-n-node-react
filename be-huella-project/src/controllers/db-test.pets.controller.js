import * as Errors from '../errors/custom-exeptions.js';
import * as petsService from '../services/db-test.pets.service.js';

const getAllPets = async (req, res, next) => {
  try {
    const result = await petsService.getAllPets();
    if (!result) {
      throw new Errors.NotFound('Not found');
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await petsService.create(req.body);
    res.send(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { getAllPets, create };