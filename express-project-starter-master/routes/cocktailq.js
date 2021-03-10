const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const { check, validationResult } = require("express-validator");
const { CocktailQ, CocktailA } = require('../db/models');



const cocktailQNotFoundError = (id) => {
  const err = Error("Cocktail-Q not found");
  err.errors = [`Cocktail-Q with id of ${id} could not be found.`];
  err.title = "Cocktail-Q not found.";
  err.status = 404;
  return err;
};
const cocktailQValidators = [

    check('question')
        .exists({ checkFalsy: true })
        .withMessage('FIELD REQUIRED')

]
router.get("/", csrfProtection, asyncHandler(async (req, res) => {
    const cocktailqs = await CocktailQ.findAll({
        // where: {
        //     order: { ASCENDING, createdAt },
        //     limit: 10
        // }

        order: [
            ['createdAt',
            'DESC']
        ],
        limit: 10

    });
    res.render("cocktail-q", { cocktailqs, csrfToken: req.csrfToken() });
}))
router.get('/new', csrfProtection, asyncHandler(async (req, res) => {
    res.render('cocktailq-question', {csrfToken: req.csrfToken()})
}))


router.post('/new', csrfProtection, cocktailQValidators, asyncHandler(async (req, res) => {
    const {
        question,
    } = req.body
    await CocktailQ.create({question, userId: req.session.auth.userId})
        res.redirect('/CocktailQs')
}));

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const cocktailq = await CocktailQ.findOne({
        where: { id: req.params.id },
        include: CocktailA
    })
    console.log(cocktailq)
    res.render('cocktailq-id', { cocktailq, csrfToken: req.csrfToken() })
}));


router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async (req, res) => {
    res.render('cocktailq-edit-page', { csrfToken: req.csrfToken()})
}))


router.post('/:id(\\d+)/edit', cocktailQValidators, asyncHandler(async (req, res, next) => {
    const cocktailq = await CocktailQ.findOne({
        where: {
            id: req.params.id
        }
    })
    if (req.user.id !== cocktailq.userId) {
        const err = new Error('Access Denied 🚫')
        err.status = 401
        err.message = "You do no have sufficient access to edit this Cocktail-Q!"
        err.title = "Access Denied 🚫"
        throw err
    }
    if (cocktailq) {
        await cocktailq.update({ question: req.body.question })
        res.redirect('/')

    }
    else {
        next(cocktailQNotFoundError(req.params.id))
    }
}))

// router.delete('/id(\\d+)', asyncHandler(async (req, res, next) => {
//     const cocktailq = await CocktailQ.findOne({
//         where: {
//           id: req.params.id
//       }
//     })
//      if (req.user.id !== cocktailq.userId) {
//        const err = new Error("Access Denied 🚫");
//        err.status = 401;
//        err.message =
//          "You do no have sufficient access to edit this Cocktail-Q!";
//        err.title = "Access Denied 🚫";
//        throw err;
//      }
//     if (cocktailq) {
//         await cocktailq.destroy();
//         res.render({message: `Deleted Cocktail-Q with id of ${req.params.id}.`})
//     } else {
//         next(cocktailQNotFoundError(req.params.id))
//     }
// }))

module.exports = router;
