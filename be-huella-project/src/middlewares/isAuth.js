import * as Errors from '../errors/custom-exeptions.js';
import { verifyToken } from '../utils/utils.js';

export const isAuth = async (req, res, next) => {
  try {
    if (!req.cookies.jwt)
      throw new Errors.Unathorized('You need authentication');
    const authCookie = req.cookies.jwt || req.cookies.recoverPasswordCookie;
    const decodedToken = verifyToken(authCookie);
    req.user = decodedToken.sub;
    next();
  } catch (error) {
    next(error);
  }
};
