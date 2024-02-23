import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import jwt from 'jsonwebtoken';
import * as Errors from '../errors/custom-exeptions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __mainDirname = path.join(__dirname, '..');

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, process.env.SECRETJWT);
  if (!verifiedToken) throw new Errors.Unathorized('Not authorized');
  if (Date.now() > verifiedToken.exp) {
    throw new Errors.ExpiredToken('Expired Token');
  }
  return verifiedToken;
};

export { __mainDirname, verifyToken };
