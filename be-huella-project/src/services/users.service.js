import * as Errors from '../errors/custom-exeptions.js';
import * as usersPrisma from '../dao/managers/prismaManager/users.prisma.js';
import UserDto from '../DTOs/user.dto.js';
import { isValidPassword, generateToken, verifyToken } from '../utils/utils.js';
import { recoverPasswordMailing } from '../utils/nodemailer.js';

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

export { recoverPassword, resetPassword };
