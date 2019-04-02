'use strict';

const router = require('express').Router();
const auth = require('../models/user-auth');

router.post('/singup', (req, res) => {
  let body = req.body;
    auth
    .singUp(body, (resp)=> {
      res.status(201).json(resp);
    })
    .catch((err) => {
        res.status(400).json({
          menssage: err,
          status: '400 bad request!'
        })
    });
  });

router.post('/singin', (req, res) => {
  let authParams = req.body;
  auth
    .singIn(authParams)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(400).json({
        menssage: err,
        status: '400 bad request!'
      });
    });
});

module.exports = router;
