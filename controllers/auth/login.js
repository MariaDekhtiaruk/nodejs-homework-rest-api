const User = require('../../models/user');
const { RequestError } = require('../../helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, 'Email is not valid');
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.password
  );
  if (!isValidPassword) {
    throw RequestError(401, 'Password is not valid');
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({ token });
};

module.exports = login;
