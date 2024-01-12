// src/app.js

const express = require('express');

const User = require('./controllers/user.controller');
const Point = require('./controllers/point.controller');
const Login = require('./controllers/login.controller');
const Raffle = require('./controllers/raffle.controller');
const Token = require('./controllers/token.controller');
const validateJWT = require('./middlewares/validateJWT');
require('./services/drawing.service');
require('./services/drawingTest.service');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/login', Login.LoginController);
app.post('/user', User.newUser);
app.get('/user', User.getAll);
app.post('/confirm', Token.confirmUserTokenController);
app.get('/point', Point.getAllPoints);
app.post('/point', validateJWT, Point.newPoint);
app.post('/point/check', Point.checkPointController);
app.post('/sendconfirmation', Token.sendConfirmationTokenController);
app.get('/token/:userId', Token.isUserTokenValidController);
app.get('/raffle', Raffle.getAllRaffles);

module.exports = app;