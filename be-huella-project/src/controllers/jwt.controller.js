import { prisma } from '../config/dbConnection.js';
import * as Errors from '../errors/custom-exeptions.js';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRETJWT;
const jwtCreate = async (req, res, next) => {
  //Consultar a la base de datos de la existencia del usuario
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Errors.BadRequest('All fields are required');
    }
    const result = await prisma.users.findFirst({ where: { email: email } });

    if (!result) {
      throw new Errors.NotFound('User Not found');
    }
    //comparar contraseñas y verificar si son correctas
    const isValid = req.body.password == result.password;

    if (!isValid) {
      throw new Errors.Unathorized('Password incorrect');
    }

    //crear el token con los datos del usuario
    const { id: sub, exp } = { id: result.id, exp: Date.now() + 3600 * 1000 }; // req.body
    const token = jwt.sign({ sub, exp }, secret);

    return res
      .cookie('jwt', token)
      .status(200)
      .json({ accessToken: token, expiredIn: exp });
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
    const data = jwt.verify(token || '', secret);

    if (Date.now() > data.exp) {
      //return res.status(498).send({ error: "El token ha expirado"});
      throw new Errors.ExpiredToken('Expired Token');
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export { jwtCreate, checkToken };
