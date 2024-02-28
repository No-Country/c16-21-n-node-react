import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.USER_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

const recoverPasswordMailing = async (email, newPassword) => {
  await transporter.sendMail({
    from: 'Huellap customer service',
    to: `${email}`,
    subject: 'Recupera tu contraseña.',
    html: `<h1>Huellap</h1>
    <h3>Hemos generado una nueva contraseña.</h3>
    <p>Tu nueva contraseña es: ${newPassword}</p>
    <br/>
    <p>Puedes cambiarla desde tu perfil.</p>
    <h3>Muchas gracias!</h3>`,
  });
};

export { recoverPasswordMailing };
