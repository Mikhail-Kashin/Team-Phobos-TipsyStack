const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models');
const bcrypt = require('bcryptjs');
const { logoutUser, loginUser } = require('../auth');


const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

const registrationValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for user name')
    .isLength({ max: 50 })
    .withMessage('User name must not be more than 50 characters long')
    .custom(value => {
      return User.findOne({ where: { userName: value }})
      .then(user => {
        if(user){
          return Promise.reject('This user name is not available')
        }
      })
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('This Email Address is already being used');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, asyncHandler( async (req, res) =>{
  res.render('login-form', {
    csrfToken: req.csrfToken(),
  });
}));

router.post('/login', csrfProtection, loginValidators, asyncHandler( async(req, res) =>{
  const {
    email,
    password
  } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {

    const user = await User.findOne({ where: { email } });

    if (user !== null) {

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {

        return loginUser(req, res, user);

      }
    }
    errors.push('Login failed for the provided email address and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('login-form', {
    email,
    errors,
    csrfToken: req.csrfToken(),
  });
}));

router.post('/logout', (req, res) =>{
  logoutUser(req, res);
});

router.get('/signup', csrfProtection, (req, res)=>{
  const user = User.build();
  res.render('sign-up', {
    user,
    csrfToken: req.csrfToken()
  })
});

router.post('/signup', csrfProtection, registrationValidators, asyncHandler(async(req, res) =>{
  const {
    userName,
    email,
    password
  } = req.body;

  // let errors = [];

  const user = User.build({
    email,
    userName
  })


  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('sign-up', {
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));



module.exports = router;
