const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
// для запуску
dotenv.config();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const app = express();

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static('avatars'));

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// код, щоб повернути помилку в форматі json
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  if (err.message.includes('E11000 duplicate key error')) {
    res
      .status(409)
      .json({ message: 'User with this email is alredy existed' });
  }

  if (err.message.includes('Cast to ObjectId failed')) {
    res.status(400).json({ message: 'ID is not valid' });
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({ message: err.message });
  }

  const responseStatus = err.status || 500;
  res.status(responseStatus).json({ message: err.message });
});

module.exports = app;
