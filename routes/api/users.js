const express = require('express');
const controllerWrapper = require('../../helpers/controllerWrapper');
const controller = require('../../controllers/users');
const { validateBody, upload } = require('../../middlewares');
const auth = require('../../middlewares/auth');
const schema = require('../../schemas/users');
const emailSchema = require('../../schemas/emailSchema');

const router = express.Router();

router.post(
  '/addContactToUser',
  controllerWrapper(auth),
  controllerWrapper(controller.addContactToUser)
);
router.get(
  '/contacts',
  controllerWrapper(auth),
  controllerWrapper(controller.getContacts)
);
router.get(
  '/info',
  controllerWrapper(auth),
  controllerWrapper(controller.getInfo)
);
router.get(
  '/current',
  controllerWrapper(auth),
  controllerWrapper(controller.getCurrent)
);

router.patch(
  '/updateSubscription',
  controllerWrapper(auth),
  validateBody(schema.userUpdateSubscriptionSchema),
  controllerWrapper(controller.updateSubscription)
);

router.patch(
  '/avatars',
  controllerWrapper(auth),
  upload.single('avatar'),
  validateBody(schema.userUpdateSubscriptionSchema),
  controllerWrapper(controller.updateAvatar)
);

router.get(
  '/verify/:verifiedToken',
  controllerWrapper(controller.verifyEmail)
);

router.post(
  '/verify',
  validateBody(emailSchema),
  controllerWrapper(controller.resendVerifyEmail)
);
module.exports = router;
