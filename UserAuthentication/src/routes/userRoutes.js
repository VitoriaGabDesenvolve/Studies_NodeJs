const express = require('express')
const routerUser = express.Router();
const userController = require('../controllers/userController');

routerUser.get('/list', userController.listUsers);
routerUser.post('/add', userController.AddUser)
routerUser.post('/login', userController.AutheticateUser)

module.exports = routerUser



