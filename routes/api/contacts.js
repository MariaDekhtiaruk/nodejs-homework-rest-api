const express = require('express');
const contactController = require('../../controllers/contacts');
const controllerWrapper = require('../../helpers/controllerWrapper');
const { validateBody } = require('../../middlewares');
const schema = require('../../schemas/contacts');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get(
  '/',
  controllerWrapper(auth),
  controllerWrapper(contactController.listContacts)
);

router.get(
  '/:contactId',
  controllerWrapper(contactController.getContactById)
);

router.post(
  '/',
  controllerWrapper(auth),
  validateBody(schema.contactSchemaRequired),
  controllerWrapper(contactController.addContact)
);

router.delete(
  '/:contactId',
  controllerWrapper(contactController.removeContact)
);

router.put(
  '/:contactId',
  validateBody(schema.contactSchemaOptional),
  controllerWrapper(contactController.updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateBody(schema.contactSchemaFavorites),
  controllerWrapper(contactController.updateStatusContact)
);

module.exports = router;
