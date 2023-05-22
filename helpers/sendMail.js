const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_USER, EMAIL_PASS } = process.env;
const sendMail = async ({ to, from, subject, text, html }) => {
  const from = 'Maria.dekh@gmail.com';
  const email = {
    to,
    from,
    subject,
    text,
    html,
  };
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  await transport.sendMail(email);
};

module.exports = sendMail;
