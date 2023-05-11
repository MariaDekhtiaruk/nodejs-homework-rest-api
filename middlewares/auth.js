const { RequestError } = require('../helpers');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const [type, token] = authHeader?.split(' ') || '';

  if (type !== 'Bearer') {
    throw RequestError(401, 'Token type is not valid');
  }

  if (!token) {
    throw RequestError(401, 'No token is provided');
  }

  try {
    jwt.verify(token, JWT_SECRET);

    console.log('jwt.verify');
  } catch (error) {
    console.log('jwt.verify error', error, error.name);
    if (
      ['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)
    ) {
      throw RequestError(401, 'JWT token type is not valid');
    }
  }

  console.log('NEXT!!!!');
  next();
};

module.exports = auth;
