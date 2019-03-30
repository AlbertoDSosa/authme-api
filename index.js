'use strict';

const express = require('express');
const app = express();
const auth = require('./libs/user-auth');

let port = process.argv[2] || 4040;

app.use(express.json());

app.post('/singup', (req, res) => {
    let body = req.body;
      auth
        .singUp(body, res)
        .catch((err) => {
          res.json(err)
        });

});

app.get('/singin', (req, res) => {
    let user = req.headers.authorization;
    auth
      .singIn(user, res)
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch((err) => {
        res.json(err)
      });
});

app.listen(port, () => console.log('Server running...'));
