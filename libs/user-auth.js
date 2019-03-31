'use strict';

const validate = require('./user-validate');
const userController = require('./user-controller');

const singIn = async (user) => {
  let resp = await validate(user, 'singin');
  return resp;
}

const singUp = async (newUser, resp) => {
  let user = await validate(newUser, 'singup');
  userController.create(user, (res) => {
    resp.status(201).json(res);
  });
}

module.exports = {
  singIn,
  singUp
}
