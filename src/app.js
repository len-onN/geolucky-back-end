// src/app.js

const express = require('express');

const User = require('./controllers/user.controller');
const Point = require('./controllers/point.controller');
const Login = require('./controllers/login.controller');
const Raffle = require('./controllers/raffle.controller');
const validateJWT = require('./middlewares/validateJWT');
require('./services/drawing.service');
require('./services/drawingTest.service');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/user', User.newUser);
app.get('/user', User.getAll);
app.post('/confirm', User.confirmUser);
app.post('/sendconfirmation', User.sendConfirmation);
app.post('/point', validateJWT, Point.newPoint);
app.get('/user/:id', User.getUserById)
app.post('/point/check', Point.checkPointController)
app.post('/login', Login.LoginController);
app.get('/raffle', Raffle.getAllRaffles);

module.exports = app;