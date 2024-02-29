import { log } from 'console';
import * as Errors from '../errors/custom-exeptions.js';
import * as usersService from '../services/users.service.js';

const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await usersService.recoverPassword(email);
    res.cookie('recoverPasswordCookie', token).status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

const userCreate = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await usersService.userCreate(user, req.file);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const result = await usersService.userUpdate(
      req.body,
      req.file,
      req.user.id
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const userFind = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    if (!email && !id) {
      throw new Errors.BadRequest('One field are required');
    }
    const result = await usersService.userFind({ email: email, id: id });

    if (!result) {
      throw new Errors.NotFound('User Not found');
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const userFindId = async (req, res, next) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      throw new Errors.BadRequest('The Id field is required');
    }
    const result = await usersService.userFindId(uid);

    if (!result) {
      throw new Errors.NotFound('User Not found');
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const result = await usersService.getAllUsers();
    if (!result) {
      throw new Errors.NotFound('Users Not found');
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const userDelete = async (req, res, next) => {
  try {
    const result = await usersService.userDelete(req.user.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await usersService.login(email, password);
    return res
      .cookie('jwt', token)
      .status(200)
      .json({ user, accessToken: token });
  } catch (error) {
    next(error);
  }
};

export {
  getAllUsers,
  userCreate,
  userDelete,
  userUpdate,
  userFind,
  userFindId,
  recoverPassword,
  login,
};
