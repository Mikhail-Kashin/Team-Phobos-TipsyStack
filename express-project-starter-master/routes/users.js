const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { check, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, asyncHandler( async (req, res) =>{
  res.render('login-form', {
    csrfToken: req.csrfToken(),
  });
}));

module.exports = router;
