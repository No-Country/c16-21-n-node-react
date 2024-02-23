import { prisma } from '../../../config/dbConnection.js';

const getUserByEmail = async (email) => {
  const result = await prisma.users.findFirst({ where: { email: email } });
  return result;
};

const getUserById = async (uid) => {
  const result = await prisma.users.findUnique({ where: { id: uid } });
  return result;
};

export { getUserByEmail, getUserById };
