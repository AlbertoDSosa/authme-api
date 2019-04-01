'use strict';

const router = require('express').Router();
const users = require('../models/user-controller');

router.get('/', (req, res) => {
  // Comprobar si el usuario que hizo la petición está autenticado.
  res.json(users.all());
});

module.exports = router;
