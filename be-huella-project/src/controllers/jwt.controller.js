import { prisma } from '../config/dbConnection.js';
import * as Errors from '../errors/custom-exeptions.js';
import * as Utils from '../utils/utils.js'
import jwt from 'jsonwebtoken';

const secret = process.env.SECRETJWT;
const jwtCreate = async (req, res, next) => {
  //Consultar a la base de datos de la existencia del usuario
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Errors.BadRequest('All fields are required');
    }
    const user = await prisma.users.findFirst({ where: { email: email } });

    if (!user) {
      throw new Errors.NotFound('User Not found');
    }
    //comparar contraseñas y verificar si son correctas
    const isValid = Utils.isValidPassword(user, password);;
    
    if (!isValid) {
      throw new Errors.Unathorized('Password incorrect');
    }

    //crear el token con los datos del usuario
    const { token, exp } = Utils.generateToken(user.id, user.name);

    return res
      .cookie('jwt', token)
      .status(200)
      .json({ data: user, accestoken: token, expexpiresIn: exp });
  } catch (error) {
    next(error);
  }
};

const checkToken = function (req, res, next) {
  try {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken) {
      throw new Errors.Forbidden('Token Not Found');
      //return res.status(403).send({ error: 'No hay token proporcionado' });
    }

    const [scheme, token] = bearerToken.split(' ');
    if (!/^Bearer$/.test(scheme)) {
      //return res.status(403).send({ error: 'Formato incorrecto del token' });
      throw new Errors.Forbidden('Incorrect Token´s Format');
    }

    req.token = token;
    const data = Utils.verifyToken(token);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export { jwtCreate, checkToken };
