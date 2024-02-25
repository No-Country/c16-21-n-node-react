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
  const token = jwt.sign({ user , exp }, process.env.SECRETJWT);
  return { token, exp };
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

export { __mainDirname, verifyToken, generateToken, isValidPassword };
