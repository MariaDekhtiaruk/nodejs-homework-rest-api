const { RequestError } = require('../../helpers');
const User = require('../../models/user');

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token: token });

  if (!user) {
    throw RequestError(400, 'Verify token is not valid');
  }
  await User.findByIdAndUpdate(user._id, {
    verified: true,
    token: null,
  });
  return res.json({ message: 'Success' });
};

module.exports = verifyEmail;
