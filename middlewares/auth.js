const { RequestError } = require('../helpers');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const [type, token] = authHeader?.split(' ') || '';

  if (type !== 'Bearer') {
    throw RequestError(401, 'Token type is not valid');
  }
  // (!user || !user.token || user.token !== token)
  if (!token) {
    throw RequestError(401, 'No token is provided');
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user.token) {
      throw RequestError(401, 'Unauthorized');
    }
    req.user = user;
  } catch (error) {
    if (
      ['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)
    ) {
      throw RequestError(401, 'JWT token type is not valid');
    } else {
      throw RequestError(error.status, error.message);
    }
  }

  next();
};

module.exports = auth;
