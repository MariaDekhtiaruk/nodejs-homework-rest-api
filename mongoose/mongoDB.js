const express = require('express');

const dotenv = require('dotenv');
// для запуску
dotenv.config();

const mongoDB = express();
module.exports = mongoDB;
