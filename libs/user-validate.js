'use strict';

const validator = require('validator');
const User = require('./user-controller');
const bcrypt = require('bcrypt');

const requiredUserProperties = ['username', 'email', 'password'];
const validateType = (user) => {
  if(typeof user !== 'object' && Array.isArray(user)) {
    throw 'The user shold be a object';
  }
  return user;
}

const validateRequiredProps = (user) => {
  requiredUserProperties.forEach((prop) => {
    if(!user.hasOwnProperty(prop)) {
      throw `The field ${prop} is required`;
    }
  });
  return user;
}

const existingUserProperty = (user, prop) => {
  let dbUser = User.find(user, prop);

  if(dbUser) {
    throw `The ${prop} ${user[prop]} already exists`;
  }
  return user;
}
const existingUser = (user, prop) => {
  return User.find(user, prop);
}

const comparePassword = (user, dbUser) => {
  return bcrypt.compare(user.password , dbUser.password); 
}

const checkEmail = (user) => {
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

module.exports = async (user, action) => {
  if(action === 'singin') {
    // Check email
    user = await checkEmail(user);
    let dbUser = await existingUser(user, 'email');

    if(!dbUser) {
      throw `The email ${user.email} does no exists`;
    }
    
    // check password
    let resp;
    await comparePassword(user, dbUser)
      .then(res => {
        resp = res;
      })
      .catch(err => console.log(err));

    if(!resp) {
      throw 'Password does not match'
    }

    return 'You have successfully logged in'
  }
  
  if(action === 'singup') {
    user = validateType(user);
    user = validateRequiredProps(user);
    user = await existingUserProperty(user, 'email');
    user = await existingUserProperty(user, 'username');
    user = await checkEmail(user);
    user = await minPasswordCharacthers(user);
  }

  return user;
}


