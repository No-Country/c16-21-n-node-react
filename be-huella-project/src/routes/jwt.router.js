import { Router, json } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/dbConnection.js';

const router = Router();
const secret = process.env.SECRETJWT;


router.post('/', async (req, res) => {
    //hacer consulta a la base de datos de la existencia del usuario
    const result = await prisma.$queryRaw`SELECT id,password FROM Users WHERE username = ${req.body['name']} OR email = ${req.body['email']};`
    
    if (result<=0){
        return res.status(400).json({message:'Usuario no encontrado'})
    };
    
    //comparar contraseñas y verificar si son correctas
    const isValid = (req.body.password == result[0].password);
    
    if(!isValid){
        return res.status(401).json({auth: false, message: 'Contraseña incorrecta'});
    }
    try{
        //crear el token con los datos del usuario
        const { id: sub, name } = { id: result.id, name:'' }; // req.body
        const token = jwt.sign({ sub, name, exp: Date.now() + 3600 * 1000 }, secret);
        //devolver al usuario su token
        res.json({auth: true, token : token});
    }catch(error){
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get('/checkToken', function(req, res){
    
    try {
        const bearerToken = req.headers['authorization'];
        if (!bearerToken) return res.status(403).send({ error: 'No hay token proporcionado' });

        const [scheme, token] = bearerToken.split(' ');
        if (!/^Bearer$/.test(scheme)) return res.status(403).send({ error: 'Formato incorrecto del token' });
        
        req.token = token;
        const data = jwt.verify(token || '', secret);

        if (Date.now() > data.exp) {
            return res.status(498).send({ error: "El token ha expirado"});
        }
        
        return res.status(200).json(data );

    }catch(error){
        return res.status(401).json({
            status: 'error',
            message: 'No autenticado'
        });
    }
});

export default router;