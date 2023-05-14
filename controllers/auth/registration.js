const User = require('../../models/user');
const bcrypt = require('bcrypt');

const registration = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    email,
    password: hashedPassword,
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
