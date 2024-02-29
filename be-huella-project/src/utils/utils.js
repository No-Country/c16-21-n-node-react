import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import jwt from 'jsonwebtoken';
import * as Errors from '../errors/custom-exeptions.js';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __mainDirname = path.join(__dirname, '..');

const generateToken = (user) => {
  let exp = Date.now() + 3600 * 1000;
  const token = jwt.sign({ user, exp }, process.env.SECRETJWT);
  return token;
};

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, process.env.SECRETJWT);
  if (!verifiedToken) throw new Errors.Unathorized('Not authorized');
  if (Date.now() > verifiedToken.exp) {
    throw new Errors.ExpiredToken('Expired Token');
  }
  return verifiedToken;
};

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const encryptPass = (pass) => {
  const saltRounds = 10;
  const hashedPass = bcrypt.hashSync(pass, saltRounds);
  return hashedPass;
};

const isCorrectPassword = (pass) => {
  const expRegular =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (expRegular.test(pass)) return true;
  else return false;
};

const generatePassword = () => {
  const caracteresMinusculas = 'abcdefghijklmnopqrstuvwxyz';
  const caracteresMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  const caracteresEspeciales = '!@#$%^&*()-_+=[]{}|;:,.<>?';

  const todosCaracteres =
    caracteresMinusculas +
    caracteresMayusculas +
    numeros +
    caracteresEspeciales;

  let codigo = '';
  codigo += caracteresMinusculas.charAt(
    Math.floor(Math.random() * caracteresMinusculas.length)
  );
  codigo += caracteresMayusculas.charAt(
    Math.floor(Math.random() * caracteresMayusculas.length)
  );
  codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
  codigo += caracteresEspeciales.charAt(
    Math.floor(Math.random() * caracteresEspeciales.length)
  );

  for (let i = 4; i < 20; i++) {
    codigo += todosCaracteres.charAt(
      Math.floor(Math.random() * todosCaracteres.length)
    );
  }

  return codigo
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export {
  __mainDirname,
  verifyToken,
  generateToken,
  isValidPassword,
  encryptPass,
  isCorrectPassword,
  generatePassword,
};
