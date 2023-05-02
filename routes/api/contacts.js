const express = require('express');
const contactController = require('../../controllers/contacts');
const controllerWrapper = require('../../helpers/controllerWrapper');
const { validateBody } = require('../../middlewares');
const schema = require('../../schemas');

const router = express.Router();

router.get('/', controllerWrapper(contactController.listContacts));

router.get(
  '/:contactId',
  controllerWrapper(contactController.getContactById)
);

router.post(
  '/',
  validateBody(schema.contactSchema),
  controllerWrapper(contactController.addContact)
);

router.delete(
  '/:contactId',
  controllerWrapper(contactController.removeContact)
);

router.put(
  '/:contactId',
  validateBody(schema.contactSchema),
  controllerWrapper(contactController.updateContact)
);

module.exports = router;
