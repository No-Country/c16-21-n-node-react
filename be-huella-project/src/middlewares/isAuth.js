import * as Errors from '../errors/custom-exeptions.js';
import { verifyToken } from '../utils/utils.js';

export const isAuth = async (req, res, next) => {
  try {
    if (!req.cookies.jwt)
      throw new Errors.Unathorized('You need authentication');
    const authCookie = req.cookies.jwt;
    const decodedToken = verifyToken(authCookie);
    req.user = decodedToken.user;

    next();
  } catch (error) {
    next(error);
  }
};
