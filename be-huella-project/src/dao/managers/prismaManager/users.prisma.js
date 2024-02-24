import { prisma } from '../../../config/dbConnection.js';

const createUser = async (user) => {
  const result = await prisma.users.create({ data: user });
  return result;
};

const deleteUser = async (user) => {
    const result = await prisma.users.delete({ where: { id: user.id } });
    return result;
};

const updateUser = async (user) => {
    const result = await prisma.users.update({ where: { id: user.id } });
    return result;
};

const findUser = async (user) => {
    const result = await prisma.users.findFirst({ where: { OR:[{ email: user.email, id: user.id }]}});
    return result;
};

const findMany = async () => {
    const result = await prisma.users.findMany();
    return result;
}

const findUserId = async (user) => {
    const result = await prisma.users.findUnique({ where: { id: user.id }});
    return result;
};

  
export { createUser, findUser, findMany, findUserId, deleteUser, updateUser};
