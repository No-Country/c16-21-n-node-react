import * as Errors from '../errors/custom-exeptions.js';
import { verifyToken } from '../utils/utils.js';

export const isAuth = async (req, res, next) => {
  try {
    if (!req.cookies.jwt)
      throw new Errors.Unathorized('You need authentication');
    let authCookie;
    if (req.cookies.recoverPasswordCookie) {
      authCookie = req.cookies.recoverPasswordCookie;
      const decodedToken = verifyToken(authCookie);
      req.user = decodedToken.user;
    } else {
      authCookie = req.cookies.jwt;
      const decodedToken = verifyToken(authCookie);
      req.user = decodedToken.user;
    }
    next();
  } catch (error) {
    next(error);
  }
};
