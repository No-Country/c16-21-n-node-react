import { prisma } from '../../../config/dbConnection.js';

const getUserByEmail = async (email) => {
  const result = await prisma.users.findFirst({ where: { email: email } });
  return result;
};

const getUserById = async (uid) => {
  const result = await prisma.users.findUnique({ where: { id: uid } });
  return result;
};

const createUser = async (user) => {
  const result = await prisma.users.create({ data: user });
  return result;
};

const deleteUser = async (user) => {
  const result = await prisma.users.delete({ where: { id: user.id } });
  return result;
};

const updateUser = async (user) => {
  const { id, ...updateData } = user;
  const result = await prisma.users.update({ where: { id }, data: updateData });
  return result;
};

const findUser = async (user) => {
  const result = await prisma.users.findFirst({
    where: { OR: [{ email: user.email, id: user.id }] },
  });
  return result;
};

const findMany = async () => {
  const result = await prisma.users.findMany();
  return result;
};

const findUserId = async (uid) => {
  const result = await prisma.users.findUnique({ where: { id: uid } });
  return result;
};

export {
  createUser,
  findUser,
  findMany,
  findUserId,
  deleteUser,
  updateUser,
  getUserByEmail,
  getUserById,
};
