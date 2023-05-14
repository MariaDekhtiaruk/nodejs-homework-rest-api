const express = require('express');
const controllerWrapper = require('../../helpers/controllerWrapper');
const controller = require('../../controllers/users');
const { validateBody } = require('../../middlewares');
const auth = require('../../middlewares/auth');
const schema = require('../../schemas/users');

const router = express.Router();

router.post(
  '/',
  controllerWrapper(auth),
  controllerWrapper(controller.addContact)
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
