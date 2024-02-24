import { log } from 'console';
import * as Errors from '../errors/custom-exeptions.js';
import * as usersService from '../services/users.services.js';

const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await usersService.recoverPassword(email);
    res.cookie('recoverPasswordCookie', token).status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.user;
    const result = await usersService.resetPassword(password, user);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

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


export { getAllUsers, userCreate, userDelete, userUpdate, userFind, userFindId, recoverPassword, resetPassword };



