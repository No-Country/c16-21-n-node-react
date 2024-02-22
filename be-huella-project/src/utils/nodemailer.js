import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.USER_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

const recoverPasswordMailing = async (email, url) => {
  await transporter.sendMail({
    from: 'Huellap customer service',
    to: `${email}`,
    subject: 'Recupera tu contraseña.',
    html: `<h1>Huellap</h1>
    <h3>Recupera tu contraseña</h3>
    <p>Entra a este <a href=${url}>enlace</a> para recuperar tu contraseña.</p>
    <h3>Muchas gracias!</h3>`,
  });
};

export { recoverPasswordMailing };
