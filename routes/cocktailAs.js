const express = require('express');
const cocktailARouter = express.Router({mergeParams: true});
const { CocktailA, Vote } = require('../db/models');
const { asyncHandler, csrfProtection, cocktailNotFoundError } = require('./utils');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');

const answerValidators = [
    check('answer')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an answer'),
  ];

/* GET pulling up the new answer form. */
cocktailARouter.get('/', requireAuth, csrfProtection, asyncHandler(async(req, res)=>{
    const qId = req.params.qId
    res.render('answer', {qId, csrfToken: req.csrfToken()});
}));

/* POST posting a new answer. */
cocktailARouter.post('/', csrfProtection, answerValidators, asyncHandler(async(req, res)=>{
    const {
        answer
    } = req.body;
    const validatorErrors = validationResult(req);
    if(validatorErrors.isEmpty()){
         const cocktailA = await CocktailA.create({ cocktailQId: req.params.qId, answer, userId: res.locals.user.id})
        res.redirect(`/CocktailQs/${cocktailA.cocktailQId}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('answer', {
            qId,
            csrfToken: req.csrfToken(),
            errors
        });
    }
}));

/* GET pulling up the update answer form */
cocktailARouter.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res)=>{
  const id = req.params.id;
  const cocktailA = await CocktailA.findByPk(id);
  res.render('edit-answer', {cocktailA, csrfToken: req.csrfToken()});
}));

/* POST updating an existing answer. */
cocktailARouter.post('/:id(\\d+)', csrfProtection, answerValidators, asyncHandler( async(req, res) =>{
    const id = req.params.id;
    const cocktailA = await CocktailA.findByPk(id);
    if(res.locals.user.id !== cocktailA.userId) {
        const err = new Error('Access Denied 🚫')
        err.status = 401
        err.message = "You do no have sufficient access to edit this Cocktail-Q!"
        err.title = "Access Denied 🚫"
        throw err
      }
    if(cocktailA){
        const {answer} = req.body;
        const validatorErrors = validationResult(req);
        if(validatorErrors.isEmpty()) {
            await cocktailA.update({answer})
            res.redirect(`/CocktailQs/${cocktailA.cocktailQId}`)
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('edit-answer', {
            cocktailA,
            csrfToken: req.csrfToken(),
            errors
        });
        }
    } else {
        next(cocktailQNotFoundError(req.params.id))
    }
}));

/* POST deleting an existing answer. */
cocktailARouter.post('/:id(\\d+)/delete', csrfProtection, asyncHandler(async(req, res) =>{
    const id = req.params.id;
    const cocktailA = await CocktailA.findByPk(id);
    if(res.locals.user.id !== cocktailA.userId) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to delete this Cocktail-A.";
        err.title = "Unauthorized";
        throw err;
    }
    if(cocktailA){
        await cocktailA.destroy()
        res.redirect(`/CocktailQs/${req.params.qId}`)
    } else {
        next(cocktailQNotFoundError(req.params.id))
    }
}));

















module.exports = cocktailARouter;
