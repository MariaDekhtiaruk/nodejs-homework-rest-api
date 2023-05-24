const User = require('../../models/user');
const { sendMail } = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, 'Email not found');
  }

  if (user.verified) {
    throw RequestError(400, 'You have been already verified');
  }
  await sendMail({
    to: email,
    subject: 'Please, confirm your email',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifiedToken}">Confirm yor email</a>`,
  });

  return res.json({ message: 'Verify email send again' });
};

module.exports = resendVerifyEmail;
