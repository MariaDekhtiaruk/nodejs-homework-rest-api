const { RequestError } = require('../../helpers');
const User = require('../../models/user');

const verifyEmail = async (req, res) => {
  const { verifiedToken } = req.params;
  const user = await User.findOne({ verifiedToken });

  if (!user) {
    throw RequestError(400, 'Verify token is not valid');
  }

  if (user.verified) {
    throw RequestError(400, 'You have been already verified');
  }
  await User.findByIdAndUpdate(user._id, {
    verified: true,
    //verifiedToken: null,
  });
  return res.json({ message: 'Success' });
};

module.exports = verifyEmail;
