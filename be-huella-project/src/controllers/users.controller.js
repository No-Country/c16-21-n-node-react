import { log } from 'console';
import * as Errors from '../errors/custom-exeptions.js';
import * as usersService from '../services/users.services.js';

const userCreate = async (req,res,next) => {
    
};

const userUpdate = () => {
    
};

const userFind = async (req, res, next) => {
    try {
        const { email, id } = req.body;
        if (!email && !id) {
          throw new Errors.BadRequest('One field are required');
        }
        const result = await usersService.userFind({email: email, id: id });
        
    
        if (!result) {
          throw new Errors.NotFound('User Not found');
        }
        
        return res
          .status(200)
          .json({ data : result });
    } catch (error) {
    next(error);
    }
    
};

const userFindId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
          throw new Errors.BadRequest('The Id field is required');
        }
        const result = await usersService.userFindId({id: id });
        
    
        if (!result) {
          throw new Errors.NotFound('User Not found');
        }
        
        return res
          .status(200)
          .json({ data : result });
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
        
        return res
            .status(200)
            .json({ data : result });
    } catch (error) {
      next(error);
    }
};

const userDelete = async (req,res, next) => {
    
};


export { getAllUsers, userCreate, userDelete, userUpdate, userFind, userFindId };