import * as usersService from '../services/users.service.js';

const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await usersService.recoverPassword(email);
    res.cookie('recoverPasswordCookie', token).status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const token = req.cookies.recoverPasswordCookie;
    const result = await usersService.resetPassword(token, password);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export { recoverPassword, resetPassword };
