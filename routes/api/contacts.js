const express = require('express');
const contactController = require('../../controllers/contacts');
const controllerWrapper = require('../../helpers/controllerWrapper');
const { validateBody, upload } = require('../../middlewares');
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
  controllerWrapper(auth),
  controllerWrapper(contactController.getContactById),
  controllerWrapper((req, res) => {
    res.json(req.selectedContact);
  })
);

router.post(
  '/',
  validateBody(schema.contactSchemaRequired),
  controllerWrapper(auth),
  controllerWrapper(contactController.addContact)
);

router.delete(
  '/:contactId',
  controllerWrapper(auth),
  controllerWrapper(contactController.getContactById),
  controllerWrapper(contactController.removeContact)
);

router.put(
  '/:contactId',
  validateBody(schema.contactSchemaOptional),
  controllerWrapper(auth),
  controllerWrapper(contactController.getContactById),
  controllerWrapper(contactController.updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateBody(schema.contactSchemaFavorites),
  controllerWrapper(auth),
  controllerWrapper(contactController.getContactById),
  controllerWrapper(contactController.updateContact)
);

router.patch(
  '/:contactId/image',
  upload.single('image'),
  controllerWrapper(contactController.uploadImage)
);

module.exports = router;
