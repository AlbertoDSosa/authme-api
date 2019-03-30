'use strict';

const casual = require('casual');
const id = require('uniqid');

casual.define('user', function() {
    return {
        _id: id(),
        username: casual.username,
        email: casual.email,
        password: casual.password
    };
});

let user = casual.user;

const users = (times) => {
    var result = [];
 
    for (var i = 0; i < times; ++i) {
        result.push(casual._user());
    }
 
    return result;
};

module.exports = {
    user,
    users
}
