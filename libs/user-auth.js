'use strict';

const validate = require('./user-validate');
const userController = require('./user-controller');

const singIn = async (user) => {
  let resp = await validate._user(user, 'singin');
  return resp;
}

const singUp = async (newUser, res) => {
  let user = await validate._user(newUser, 'singup');
  userController.create(user, res);
}

module.exports = {
  singIn,
  singUp
}
