// src/app.js

const express = require('express');

const User = require('./controllers/user.controller');
const Point = require('./controllers/point.controller');
const Login = require('./controllers/login.controller');
const validateJWT = require('./auth/validateJWT');
require('./services/drawing.service');
require('./services/drawingTest.service');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/user', User.newUser);
app.get('/user', User.getAll);
app.post('/point', validateJWT, Point.newPoint);
app.post('/point/check', Point.checkPointController)
app.post('/login', Login.LoginController);

module.exports = app;