import * as usersService from '../services/users.service.js';

const recoverPassword = async (req, res, next) => {
  try {
    const { email, url } = req.body;
    const token = await usersService.recoverPassword(email, url);
    res
      .cookie('recoverPasswordCookie', token)
      .status(200)
      .send({ message: 'We just sent you an email!' });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.user;
    const result = await usersService.resetPassword(password, user);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export { recoverPassword, resetPassword };
