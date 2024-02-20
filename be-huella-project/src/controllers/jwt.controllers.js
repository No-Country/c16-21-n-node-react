import { prisma } from '../config/dbConnection.js';
import * as Errors from '../errors/custom-exeptions.js';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRETJWT;
const jwtCreate = async (req, res, next) => {
    //Consultar a la base de datos de la existencia del usuario
    try {
        const result = await prisma.users.findFirst({ where: { email: req.body.email } });
    
        if (!result) {
            throw new Errors.NotFound('User Not found');
        }
        //comparar contraseñas y verificar si son correctas
        const isValid = (req.body.password == result.password);
        
        if (!isValid) {
            throw new Errors.Unathorized('Password incorrect');
        }
        
        //crear el token con los datos del usuario
        const { id: sub } = { id: result.id }; // req.body
        const token = jwt.sign({ sub, exp: Date.now() + (3600 * 1000) }, secret);
        
        return res.cookie("jwt", token).status(200).json({ expiredIn: token.exp, accessToken: token });
    } catch (error) {
        next(error);
    }
};

const checkToken = function(req, res, next){
    
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

    }catch(error){
        next(error);
    }
}

export { jwtCreate, checkToken };