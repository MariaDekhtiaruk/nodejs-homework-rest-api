const getInfo = require('./getInfo');
const getContacts = require('./getContacts');
const addContactToUser = require('./addContactToUser');
const getCurrent = require('./current');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');
module.exports = {
  getInfo,
  getContacts,
  addContactToUser,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
