'use strict';

const router = require('express').Router();
const users = require('../models/user-controller');

router.get('/', (req, res) => {
  // Comprobar si el usuario que hizo la petición está autenticado.
  res
    .status(200)
    .json({
      data: users.all(),
      status: '200 ok!'
    });
});

module.exports = router;
