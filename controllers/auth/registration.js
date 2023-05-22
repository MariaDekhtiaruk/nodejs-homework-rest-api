const User = require('../../models/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const registration = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
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
