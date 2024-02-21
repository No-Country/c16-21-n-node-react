import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const secret = process.env.SECRETJWT;

router.post('/', (req, res) => {
  const { id: sub, name } = { id: req.body['id'], name: req.body['name'] };
  const token = jwt.sign({ sub, name, exp: Date.now() + 200 * 1000 }, secret);
  res.send({ token });
});

router.get('/checkToken', function (req, res) {
  try {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken)
      return res.status(403).send({ error: 'No hay token proporcionado' });

    const [scheme, token] = bearerToken.split(' ');
    if (!/^Bearer$/.test(scheme))
      return res.status(403).send({ error: 'Formato incorrecto del token' });

    req.token = token;
    const data = jwt.verify(token || '', secret);

    return res.status(200).json({
      message: `Bienvenido ${data.name}`,
      content: data,
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'No autenticado',
    });
  }
});

export default router;
