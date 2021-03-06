'use strict';
require('./config');

const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

server.use(express.json());

server.use((err, req, res, next) => {
  if (err) {
    err['SyntaxError'] = undefined;
    res.status(400).json(err);
  } else {
    next()
  }
});

server.use(require('./routes'));

server.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
