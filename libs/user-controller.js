'use strict';

const uniqId = require('uniqid');
const database = require('./temp_db/database');
const bcrypt = require('bcrypt');


let users = database();
const findUser = (user, prop = '_id') => {
  let dbUser = users.find((item) => {
    return item[prop] === user[prop];
  });

  return dbUser;
}

const createUser = (user, res) => {
  bcrypt.hash(user.password, 8)
    .then(hash => {
      // assign id
      user['_id'] = uniqId();
      // encrypt password
      user['password'] = hash;
      // write user
      database(user);
      // clear password
      user.password = undefined;
      // send response message
      res({
        message: 'User registered successfully',
        user
      })
    })
    .catch(err => console.log)

}

const getUsers = () => {
    return users;
}

module.exports = {
    create: createUser,
    find: findUser,
    all: getUsers
}
