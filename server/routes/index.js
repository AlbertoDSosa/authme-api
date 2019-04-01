'use strict';

const router = require('express').Router();

router.get('/', (req,res) => {
    res.send('Esta es la home de la api');
});

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));

router.use((req, res) => {
  let url = req.url;
  res.status(404).json({message: `The ${url} route does not exist`});
});

module.exports = router;
