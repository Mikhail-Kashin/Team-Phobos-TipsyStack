const express = require('express');
const router = express.Router();
const {asyncHandler, csrfProtection} = require('./utils')
const {Vote} = require('../db/models')
const {requireAuth} = require('../auth')


/* GET splash page. */
router.get('/', function (req, res, next) {
    console.log('inside index', res.locals.csrfToken)
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

/* PATCH updating upvoting without a refresh. */
router.patch('/CocktailAs/:id(\\d+)/upvote', asyncHandler(async(req, res) => {
    const vote = await Vote.findOne({where: {
        cocktailAId: req.params.id,
        userId: res.locals.user.id
    }});
    if (!vote) {
        await Vote.create({cocktailAId: req.params.id, userId: res.locals.user.id, voteDirection: true});
    } else if (vote && vote.voteDirection === false){
        await vote.update({voteDirection: true});
    }
    const votes = await Vote.findAll({where: {cocktailAId: req.params.id}})
    let voteCount = 0;
    votes.forEach(vote =>{
        if(vote.voteDirection) voteCount++;
        else voteCount--;
    });
    res.json({counter: voteCount});
}));

/* PATCH updating downvoting without a refresh. */
router.patch('/CocktailAs/:id(\\d+)/downvote', asyncHandler(async(req, res) => {
    const vote = await Vote.findOne({where: {
        cocktailAId: req.params.id,
      userId: res.locals.user.id
  }});
  if (!vote) {
      await Vote.create({cocktailAId: req.params.id, userId: res.locals.user.id, voteDirection: false});
  } else if (vote && vote.voteDirection === true){
      await vote.update({voteDirection: false});
  }
  const votes = await Vote.findAll({where: {cocktailAId: req.params.id}})
  let voteCount = 0;
  votes.forEach(vote =>{
      if(vote.voteDirection) voteCount++;
      else voteCount--;
  });
  res.json({counter: voteCount});
}));

module.exports = router;
