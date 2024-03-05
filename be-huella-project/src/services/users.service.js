import * as Errors from '../errors/custom-exeptions.js';
import * as usersPrisma from '../dao/managers/prismaManager/users.prisma.js';
import UserDto from '../DTOs/user.dto.js';
import {
  isValidPassword,
  generateToken,
  encryptPass,
  isCorrectPassword,
  generatePassword,
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
  if (user.admin) {
    user.admin = Boolean(user.admin);
  }

  if (user.alerts) {
    user.alerts = Boolean(user.alerts);
  }

  const result = await usersPrisma.createUser(user);
  delete result.password;

  return result;
};

const userUpdate = async (newUser, image, uid) => {
  if (!newUser) {
    throw new Errors.BadRequest('You must update something');
  }

  const userById = await usersPrisma.findUser({ id: uid });

  let uploadedImageUrl;

  if (userById.id !== uid)
    throw new Errors.Unathorized('Dont have credentials to update this user');

  if (image) uploadedImageUrl = await uploadImage(image);

  Object.keys(newUser).forEach((key) => {
    if (newUser[key] === '' || newUser[key] === undefined) {
      delete newUser[key];
    }
  });

  if (newUser.admin !== undefined) {
    newUser.admin = String(newUser.admin).toLowerCase() === 'true';
  }

  if (newUser.alerts !== undefined) {
    newUser.alerts = String(newUser.alerts).toLowerCase() === 'true';
  }

  if (newUser.password) {
    const formatCorrect = isCorrectPassword(newUser.password);
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
  delete result.password;
  return result;
};

const userDelete = async (uid) => {
  const userById = await usersPrisma.getUserById(uid);
  if (!userById) throw new Errors.NotFound('User not found');
  if (userById.id !== uid)
    throw new Errors.Unathorized('Dont have credentials to delete this user');
  const result = await usersPrisma.deleteUser(userById);
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

const getUserById = async (uid) => {
  if (!uid) {
    throw new Errors.BadRequest('Id atribute is required');
  }
  const result = await usersPrisma.getUserById(uid);
  delete result.password;
  if (!result) {
    throw new Errors.NotFound(`The user id ${uid} does not exist`);
  }
  return result;
};

const recoverPassword = async (email) => {
  if (!email) throw new Errors.BadRequest('Email is required');
  const user = await usersPrisma.getUserByEmail(email);
  const newPassword = generatePassword();
  recoverPasswordMailing(user.email, newPassword);
  user.password = encryptPass(newPassword);
  delete user.pets;
  await usersPrisma.updateUser(user);
  return;
};

const login = async (email, password) => {
  if (!email || !password)
    throw new Errors.BadRequest('Email and Password are required');
  const user = await usersPrisma.getUserByEmail(email);
  if (!user) throw new Errors.NotFound('Email is not registered');
  const isValid = isValidPassword(user, password);
  if (!isValid) throw new Errors.BadRequest('Incorrect credentials');
  delete user.password;
  const token = generateToken(new UserDto(user));
  return { user, token };
};

export {
  getAllUsers,
  userCreate,
  userDelete,
  userUpdate,
  userFind,
  getUserById,
  recoverPassword,
  login,
};
