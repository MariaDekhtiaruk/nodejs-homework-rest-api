const express = require('express');
const controllerWrapper = require('../../helpers/controllerWrapper');
const controller = require('../../controllers/users');
const { validateBody } = require('../../middlewares');
const auth = require('../../middlewares/auth');
const schema = require('../../schemas/users');

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

module.exports = router;

// test test
