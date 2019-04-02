'use strict';

const validator = require('validator');
const User = require('./user-controller');
const bcrypt = require('bcrypt');
const isEmpty = require('lodash').isEmpty;

const requiredSingUpProps = ['username', 'email', 'password'];
const requiredSingInProps = ['email', 'password'];

const validateType = (user) => {
  if(typeof user !== 'object' || Array.isArray(user)) {
    throw 'The user shold be a object';
  }
  return user;
}

const validateIsEmptyUser = (user) => {
  if(isEmpty(user)){
    throw 'The request must contain a user'
  }
  return user;
}

const validateRequiredProps = (user, actionProps) => {
  actionProps.forEach((prop) => {
    if(!user.hasOwnProperty(prop)) {
      throw `The property ${prop} is required`;
    }
  });
  return user;
}

const validateUserPropsValue = (user, actionProps) => {
  actionProps.forEach((prop)=> {
    if(!user[prop]) {
      throw `The field ${prop} is required`;
    }
  });
  return user;
}

const existingUserProperty = (user) => {
  for(let key in user) {
    if(User.find(user, key)) {
      throw `The ${key} ${user[key]} already exists`;
    }
  }
  return user;
}

const notExistingUser = async  (user, prop) => {
  let dbUser = await User.find(user, prop);
  if(!dbUser) {
    throw `The email ${user.email} does no exists`;
  }
  return dbUser;
}

const comparePassword = (user, dbUser) => {
  return bcrypt.compare(user.password , dbUser.password); 
}

const checkEmail = (user) => {
  user.email = user.email.toLowerCase();
  if(!validator.isEmail(user.email)) {
    throw `${user.email} is not a valid email`;
  }
  return user;
}

const minPasswordCharacthers = (user) => {
  if(user.password.length < 8) {
    throw 'The password must have at least 8 characters';
  }

  return user;
}

const singin = async (user) => {
  user = validateRequiredProps(user, requiredSingInProps);
  user = validateUserPropsValue(user, requiredSingInProps);
  // Check email
  user = checkEmail(user);
  let dbUser = await notExistingUser(user, 'email');

  // check passport
  if(!await comparePassword(user, dbUser)) {
    throw 'Password does not match';
  }

  // clear password and id
  dbUser.password = undefined;
  dbUser._id = undefined;

  return {
    message: 'You have successfully logged in',
    status: '200 OK!',
    data: dbUser
  };
}

const singup = async (user) => {
  user = validateRequiredProps(user, requiredSingUpProps);
  user = validateUserPropsValue(user, requiredSingUpProps);
  user = checkEmail(user);
  user = await existingUserProperty(user);
  user = await minPasswordCharacthers(user);
  return user;
}

module.exports = async (user, action) => {
  user = validateType(user);
  user = validateIsEmptyUser(user);
  
  if(action === 'singin') {
    return await singin(user);
  }
  
  if(action === 'singup') {
    user = await singup(user);
  }

  return user;
}


