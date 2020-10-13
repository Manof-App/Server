const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRouter');

const app = express();

// Routes which should handle requests

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(authRouter);

module.exports = app;
