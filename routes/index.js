const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./utils')
const {Vote} = require('../db/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});


router.patch('/CocktailAs/:id(\\d+)/upvote', asyncHandler(async(req, res) => {
  const vote = await Vote.findOne({where: {
      cocktailAId: req.params.id,
      userId: res.locals.user.id
  }})
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
}))
router.patch('/CocktailAs/:id(\\d+)/downvote', asyncHandler(async(req, res) => {
  console.log('in the backend')
  const vote = await Vote.findOne({where: {
      cocktailAId: req.params.id,
      userId: res.locals.user.id
  }})
  if (!vote) {
      await Vote.create({cocktailAId: req.params.id, userId: res.locals.user.id, direction: false});
  } else if (vote && vote.direction === true){
      await vote.update({direction: false});
  }
  const votes = await Vote.findAll({where: {cocktailAId: req.params.id}})
  let voteCount = 0;
  votes.forEach(vote =>{
      if(vote.direction) voteCount++;
      else voteCount--;
  });
  res.json({counter: voteCount});
}))

module.exports = router;
