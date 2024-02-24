import * as Errors from '../errors/custom-exeptions.js';
import * as daoUser from '../dao/managers/prismaManager/users.prisma.js'


const getAllUsers = async () => {
    const result = await daoUser.findMany();
    // const result = null;
    if (!result) throw new Errors.NotFound('Users not found');
    return result;
};
  
const userCreate = async (user) => {
if (!user.name || !user.location || !user.type) {
    throw new Errors.BadRequest('All atributes are required');
}
const result = await daoUser.createUser(user);
return result;
};
  
const userUpdate = async (user) => {
if (!user.name || !user.location || !user.type) {
    throw new Errors.BadRequest('All atributes are required');
}
const result = await daoUser.updateUser(user);
return result;
};

const userDelete = async (user) => {
    if (!user) {
      throw new Errors.BadRequest('Id atribute is required');
    }
    const result = await daoUser.deleteUser(user);
    return result;
};

const userFind = async (user) => {
    if (!user.email && !user.id) {
      throw new Errors.BadRequest('Any atribute is required');
    }
    const result = await daoUser.find(user); 
    
    if(!result){
        throw new Errors.NotFound(`The user ${user.name} or id ${user.id} does not exist`);
    }
    return result;
};

const userFindId = async (user) => {
    if (!user.id) {
      throw new Errors.BadRequest('Id atribute is required');
    }
    const result = await daoUser.findId(user); 
    
    if(!result){
        throw new Errors.NotFound(`The user id ${user.id} does not exist`);
    }
    return result;
};

export { getAllUsers, userCreate, userDelete, userUpdate, userFind, userFindId };
  