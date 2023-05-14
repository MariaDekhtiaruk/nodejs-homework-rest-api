const express = require('express');
const controllerWrapper = require('../../helpers/controllerWrapper');
const userController = require('../../controllers/auth');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(
  '/registration',
  controllerWrapper(userController.registration)
);
router.post('/login', controllerWrapper(userController.login));

router.post(
  '/logout',
  controllerWrapper(auth),
  controllerWrapper(userController.logout)
);

module.exports = router;
