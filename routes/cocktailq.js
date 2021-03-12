const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection, cocktailQNotFoundError } = require("./utils");
const { check, validationResult } = require("express-validator");
const { CocktailQ, CocktailA , User, Vote } = require('../db/models');
const { requireAuth } = require('../auth');

const cocktailQValidators = [

    check('question')
        .exists({ checkFalsy: true })
        .withMessage('FIELD REQUIRED')

]
router.get("/", csrfProtection, asyncHandler(async (req, res) => {
    const cocktailqs = await CocktailQ.findAll({
       include: User,

        order: [
            ['updatedAt',
            'DESC']
        ],
        limit: 10

    });
    res.render("cocktail-q", { cocktailqs, csrfToken: req.csrfToken() });
}))
router.get('/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
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
        include: [{model: CocktailA, include: [Vote, User]}, User]
    });

    const votes = cocktailq.CocktailAs.reduce((votes, answer) => {
        const totalVoteCount = answer.Votes.reduce((voteCount, vote) => {
            if (vote.voteDirection) voteCount++;
            else voteCount--;
            return voteCount;
        },0);
        votes[answer.id] = totalVoteCount;
        return votes;
    },{});

    console.log('votes',votes)
    res.render('cocktailq-id', { cocktailq, votes, csrfToken: req.csrfToken() })
}));


router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const cocktailq = await CocktailQ.findByPk(req.params.id);
    res.render('cocktailq-edit-page', { cocktailq, csrfToken: req.csrfToken()})
}))


router.post('/:id(\\d+)/edit', cocktailQValidators, asyncHandler(async (req, res, next) => {
    const cocktailq = await CocktailQ.findOne({
        where: {
            id: req.params.id
        }
    })
    if (res.locals.user.id !== cocktailq.userId) {
        const err = new Error('Access Denied 🚫')
        err.status = 401
        err.message = "You do no have sufficient access to edit this Cocktail-Q!"
        err.title = "Access Denied 🚫"
        throw err
    }
    if (cocktailq) {
        await cocktailq.update({ question: req.body.question })
        res.redirect(`/CocktailQs/${req.params.id}`)

    }
    else {
        next(cocktailQNotFoundError(req.params.id))
    }
}))

router.post('/:id(\\d+)/delete', csrfProtection, asyncHandler(async (req, res, next) => {
    const cocktailq = await CocktailQ.findOne({
        where: {
          id: req.params.id
      }
    })
     if (res.locals.user.id !== cocktailq.userId) {
       const err = new Error("Access Denied 🚫");
       err.status = 401;
       err.message =
         "You do no have sufficient access to edit this Cocktail-Q!";
       err.title = "Access Denied 🚫";
       throw err;
     }
    if (cocktailq) {
        await CocktailA.destroy({
            where: {
                cocktailQId: req.params.id
            }
        })
        await cocktailq.destroy();
        res.redirect(`/CocktailQs`)
        // res.render({message: `Deleted Cocktail-Q with id of ${req.params.id}.`})
    } else {
        next(cocktailQNotFoundError(req.params.id))
    }
}))



router.get('/all', asyncHandler(async (req, res) => {
    const cocktailqs = await CocktailQ.findAll({
        include: User
    })

    res.render('cocktail-q-show-all', { cocktailqs })
}))

module.exports = router;
