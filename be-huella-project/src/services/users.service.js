import * as Errors from '../errors/custom-exeptions.js';
import * as usersPrisma from '../dao/managers/prismaManager/users.prisma.js';
import UserDto from '../DTOs/user.dto.js';
import { isValidPassword, generateToken, verifyToken, encryptPass } from '../utils/utils.js';
import { recoverPasswordMailing } from '../utils/nodemailer.js';


const getAllUsers = async () => {
  const result = await usersPrisma.findMany();
  // const result = null;
  if (!result) throw new Errors.NotFound('Users not found');
  return result;
};

const userCreate = async (user) => {
  if (!user.username || !user.location || !user.email) {
    throw new Errors.BadRequest('All atributes are required');
  }
  const userFromDB = await usersPrisma.findUser({ email: user.email });
  if (userFromDB) {
    throw new Errors.Forbidden('User with this email already exists');
  } 
  user.password = encryptPass(user.password);
  const result = await usersPrisma.createUser(user);
  return result;
};

const userUpdate = async (user) => {
  if (!user.username || !user.location || !user.email) {
    throw new Errors.BadRequest('All atributes are required');
  }
  const result = await usersPrisma.updateUser(user);
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
  
  if(!result){
      throw new Errors.NotFound(`The user ${user.name} or id ${user.id} does not exist`);
  }
  return result;
};

const userFindId = async (user) => {
  if (!user.id) {
    throw new Errors.BadRequest('Id atribute is required');
  }
  const result = await usersPrisma.findUserId(user); 
  
  if(!result){
      throw new Errors.NotFound(`The user id ${user.id} does not exist`);
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

export { getAllUsers, userCreate, userDelete, userUpdate, userFind, userFindId, recoverPassword, resetPassword };
