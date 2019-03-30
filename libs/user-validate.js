'use strict';

const validator = require('validator');
const User = require('./user-controller');
const bcrypt = require('bcrypt');
const auth = require('basic-auth');

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
  let dbUser = User.find(user, prop);
  if(!dbUser) {
    throw `The ${prop} ${dbUser.email} does no exists`;
  }

  return dbUser;
}

const comparePassword = (user) => {
  let dbUser = existingUser(user, 'email');
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

const _user = async (user, action) => {
  if(action === 'singin') {
    user = auth.parse(user);

    let parsedUser = {
      password: user.pass,
      email: user.name
    }

    parsedUser = await checkEmail(parsedUser);
    
    let resp;
    await comparePassword(parsedUser)
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
    user = await validateType(user);
    user = await validateRequiredProps(user);
    user = await existingUserProperty(user, 'email');
    user = await existingUserProperty(user, 'username');
    user = await checkEmail(user);
    user = await minPasswordCharacthers(user);
  }


  return user;
}

module.exports = {
  _user
};
