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
  user['_id'] = uniqId();

  bcrypt.hash(user.password, 8, (err, hash) => {
    if(err) {
      res.json(500).json(err);
    };
    user['password'] = hash;
    database(user);
    res
      .status(201)
      .json({message: 'User registered successfully'});
  });
}

const getUsers = () => {
    return users;
}

module.exports = {
    create: createUser,
    find: findUser,
    all: getUsers
}
