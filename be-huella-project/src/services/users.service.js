import * as Errors from '../errors/custom-exeptions.js';
import * as usersPrisma from '../dao/managers/prismaManager/users.prisma.js';
import UserDto from '../DTOs/user.dto.js';
import {
  isValidPassword,
  generateToken,
  verifyToken,
  encryptPass,
  isCorrectPassword,
} from '../utils/utils.js';
import { recoverPasswordMailing } from '../utils/nodemailer.js';
import { uploadImage } from '../middlewares/uploadImage.js';

const getAllUsers = async () => {
  const result = await usersPrisma.findMany();
  if (!result) throw new Errors.NotFound('Users not found');
  return result;
};

const userCreate = async (user, image) => {
  if (
    !user.username ||
    !user.location ||
    !user.email ||
    !user.phone ||
    !user.password
  ) {
    throw new Errors.BadRequest('All atributes are required');
  }
  const userFromDB = await usersPrisma.findUser({ email: user.email });
  if (userFromDB) {
    throw new Errors.Forbidden('User with this email already exists');
  }
  const formatCorrect = isCorrectPassword(user.password);
  if (!formatCorrect) {
    throw new Errors.BadRequest(
      `The password should contain At least one lowercase letter. At least one uppercase letter. At least one digit. At least one special character and Minimum length of 8 characters.`
    );
  }
  user.password = encryptPass(user.password);
  if (image) {
    const uploadedImageUrl = await uploadImage(image);
    user.profilePic = uploadedImageUrl;
  }
  const result = await usersPrisma.createUser(user);
  return result;
};

const userUpdate = async (newUser, image, uid) => {
  if (!newUser) {
    throw new Errors.BadRequest('You must update something');
  }

  const userById = await userFindId(uid);

  let uploadedImageUrl;

  if (userById.id !== uid)
    throw new Errors.Unathorized('Dont have credentials to update this user');

  if (image) uploadedImageUrl = await uploadImage(image);

  Object.keys(newUser).forEach((key) => {
    if (newUser[key] === '' || newUser[key] === undefined) {
      delete newUser[key];
    }
  });

  if (newUser.admin) {
    newUser.admin = Boolean(newUser.admin);
  }

  if (newUser.alerts) {
    newUser.alerts = Boolean(newUser.alerts);
  }
  if (newUser.password) {
    const formatCorrect = isCorrectPassword(user.password);
    if (!formatCorrect) {
      throw new Errors.BadRequest(
        `The password should contain At least one lowercase letter. At least one uppercase letter. At least one digit. At least one special character and Minimum length of 8 characters.`
      );
    }
    newUser.password = encryptPass(newUser.password);
  }

  const updatedUser = {
    ...userById,
    ...newUser,
    ...(image && { profilePic: uploadedImageUrl }),
  };

  const result = await usersPrisma.updateUser(updatedUser);
  return result;
};

const userDelete = async (user) => {
  if (!user) {
    throw new Errors.BadRequest('Id atribute is required');
  }
  const result = await usersPrisma.deleteUser(user);
  return result;
};

const userFind = async (user) => {
  if (!user.email && !user.id) {
    throw new Errors.BadRequest('Any atribute is required');
  }
  const result = await usersPrisma.findUser(user);
  delete result.password;
  if (!result) {
    throw new Errors.NotFound(
      `The user ${user.name} or id ${user.id} does not exist`
    );
  }

  return result;
};

const userFindId = async (uid) => {
  if (!uid) {
    throw new Errors.BadRequest('Id atribute is required');
  }
  const result = await usersPrisma.findUserId(uid);
  delete result.password;
  if (!result) {
    throw new Errors.NotFound(`The user id ${uid} does not exist`);
  }
  return result;
};

const recoverPassword = async (email) => {
  if (!email) throw new Errors.BadRequest('Email is required');
  const user = await usersPrisma.getUserByEmail(email);
  const userDto = new UserDto(user);
  const token = generateToken(userDto);
  const url = `http://localhost:${process.env.PORT}/api/users/recover-password/${user.id}`;
  recoverPasswordMailing(user.email, url);
  return token;
};

const resetPassword = async (password, user) => {
  if (!password) throw new Errors.BadRequest('Password is required');
  const userById = await usersPrisma.getUserById(user.id);
  const isValid = isValidPassword(userById, password);
  if (isValid)
    throw new Errors.BadRequest(
      'The password must be different to previous passwords'
    );
  const updateUser = 'Contraseña actualizada';
  return updateUser;
};

export {
  getAllUsers,
  userCreate,
  userDelete,
  userUpdate,
  userFind,
  userFindId,
  recoverPassword,
  resetPassword,
};
