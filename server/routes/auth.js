'use strict';

const router = require('express').Router();
const auth = require('../models/user-auth');

router.post('/singup', (req, res) => {
  let body = req.body;
    auth
    .singUp(body, res)
    .catch((err) => {
        res.json(err)
    });
  });
  
router.get('/singin', (req, res) => {
let user = {
  password: req.headers.password,
  email: req.headers.email
};

auth
  .singIn(user)
  .then(resp => {
  res.status(200).json(resp);
  })
  .catch((err) => {
    res.json(err)
  });
});

module.exports = router;
