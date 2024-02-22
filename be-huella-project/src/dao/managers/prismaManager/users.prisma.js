import { prisma } from '../../../config/dbConnection.js';

const getUserByEmail = async (email) => {
  const result = await prisma.users.findFirst({ where: { email: email } });
  return result;
};

export { getUserByEmail };
