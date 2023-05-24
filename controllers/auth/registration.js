const User = require('../../models/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { sendMail } = require('../../helpers');
const { v4 } = require('uuid'); // для генерації айдішніків

const registration = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const token = v4();
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    token,
  });

  await sendMail({
    to: email,
    subject: 'Please, confirm your email',
    html: `<a href="http://localhost:3000/api/users/verify/${token}">Confirm yor email</a>`,
  });
  const { subscription } = newUser;

  return res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = registration;
