const express = require('express');
const controllerWrapper = require('../../helpers/controllerWrapper');
const userController = require('../../controllers/auth');

const router = express.Router();

router.post(
  '/registration',
  controllerWrapper(userController.registration)
);
router.post('/login', controllerWrapper(userController.login));

module.exports = router;
