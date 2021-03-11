const express = require('express');
const cocktailARouter = express.Router({mergeParams: true});
const { CocktailA, Vote } = require('../db/models');
const { asyncHandler, csrfProtection, cocktailQNotFoundError } = require('./utils');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');

const answerValidators = [
    check('answer')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an answer'),
  ];


//need to update forms with csrf

cocktailARouter.get('/', requireAuth, csrfProtection, asyncHandler(async(req, res)=>{
    const qId = req.params.qId
    // console.log(req.params)
    res.render('answer', {qId, csrfToken: req.csrfToken()});
}));

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

cocktailARouter.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res)=>{
  const id = req.params.id;
  const cocktailA = await CocktailA.findByPk(id);

  res.render('edit-answer', {cocktailA, csrfToken: req.csrfToken()});
}))

cocktailARouter.post('/:id(\\d+)', csrfProtection, answerValidators, asyncHandler( async(req, res) =>{
    const id = req.params.id;
    const cocktailA = await CocktailA.findByPk(id);
    // console.log(id, cocktailA);
    if(res.locals.user.id !== cocktailA.userId) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to edit this Cocktail-A.";
        err.title = "Unauthorized";
        throw err;
      }

    if(cocktailA){
        const {answer} = req.body;
        const validatorErrors = validationResult(req);
        if(validatorErrors.isEmpty()) {
            //error handling
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
        //next(e) error handling if no cocktailA at primary id
        next(cocktailQNotFoundError(req.params.id))
    }
}));

cocktailARouter.post('/:id(\\d+)/delete', csrfProtection, asyncHandler(async(req, res) =>{
    const id = req.params.id;

    const cocktailA = await CocktailA.findByPk(id);
    // console.log(id, cocktailA);
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
        //next(e) error handling if no cocktailA at primary id
        next(cocktailQNotFoundError(req.params.id))
    }

}));

















module.exports = cocktailARouter;
