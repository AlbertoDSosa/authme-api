'use strict';

const validate = require('./user-validate');
const userController = require('./user-controller');

const singIn = async (authParams) => {
  return await validate(authParams, 'singin');
}

const singUp = async (newUser, resp) => {
  let user = await validate(newUser, 'singup');
  userController.create(user, resp);
}

module.exports = {
  singIn,
  singUp
}
