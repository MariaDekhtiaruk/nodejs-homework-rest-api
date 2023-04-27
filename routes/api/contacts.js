const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const RequestError = require('../../helpers');

// встановлюємо бібліотеку joi, щоб перевірити тіло запиту, щоб там були всі обовязкові компоненти, наприклад ім'я і телефон
const contactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
    // передати обробник помилок, який прописаний в app
    // res.status(500).json({ message: error.message });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await contacts.getContactById(contactId);
    if (!oneContact) {
      throw RequestError(404, 'Not Found');
      // Код помилки перенесли в окремий helpers
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;
      // return res.status(404).json({ message: 'Not found' });
    }
    res.json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, 'Not Found');
    }
    res.json({ message: 'Delete success' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, 'Not Found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
