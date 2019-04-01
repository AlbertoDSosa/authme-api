 'use strict';
const fs = require('fs');
const database = (newUser) => {
  // get text from file
  const dataString = fs.readFileSync( `${__dirname}/data.json`, 'UTF-8' );
  // parse json string to object
  const data = JSON.parse( dataString );
  
  if(newUser) {
    //  update object
    data.users.push(newUser);
    // transform object to string
    const outputString = JSON.stringify(data)
    // write string to file
    fs.writeFileSync( `${__dirname}/data.json`, outputString);
    
    return newUser;
  }

  return data.users;
}

 module.exports = database;
