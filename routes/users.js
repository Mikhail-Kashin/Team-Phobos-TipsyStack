const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection, cocktailQNotFoundError } = require('./utils');
const { check, validationResult } = require('express-validator');
const { User, CocktailQ, CocktailA } = require('../db/models');
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
      return User.findOne({ where: { email: value } })
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

/* GET pulls up a login form */
router.get('/login', csrfProtection, asyncHandler( async (req, res) =>{
  res.render('login-form', {
    csrfToken: req.csrfToken(),
  });
}));

/* POST attempts to log in with given credentials */
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
      };
    };
    errors.push('Login failed for the provided email address and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  };
  res.render('login-form', { email, errors, csrfToken: req.csrfToken() });
}));

/* POST logs the current user out of the app. */
router.post('/logout', (req, res) =>{
  logoutUser(req, res);
});

/* GET pulls up the signup form. */
router.get('/signup', csrfProtection, (req, res)=>{
  const user = User.build();
  res.render('sign-up', {
    user,
    csrfToken: req.csrfToken()
  })
});

/* POST creates a new user with the credentials from the signup form. */
router.post('/signup', csrfProtection, registrationValidators, asyncHandler(async(req, res) =>{
  const {
    userName,
    email,
    password
  } = req.body;
  const user = User.build({
    email,
    userName
  });
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
  };
}));

/* POST signs in a 'demo' user to show the apps functionality. */
router.post('/demo', async (req, res) => {
  const user = await User.findOne({ where: { email: 'Demo@demo.com'}})
  return loginUser(req, res, user);
});

/* GET pulls up list of all users. */
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.render('users-page', {users});
}));

/* GET pulls up a specific user, as well as their associated questions and answers. */
router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id},
     include: [CocktailQ,
     {model: CocktailA, include: CocktailQ}]
    });
  res.render('user-profile', {user})
}));



module.exports = router;
