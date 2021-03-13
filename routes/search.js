const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection, cocktailNotFoundError } = require("./utils");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { CocktailQ, CocktailA, User, Vote } = require('../db/models');

/* POST pulls up a page with the search results */
router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const { query } = req.body;
    const questions = await CocktailQ.findAll({
        include: User,
        where: {
            question: {
                [Op.substring] : `%${query}%`
            }, 
        },      
    });
    res.render('search', {
        questions,
        csrfToken: req.csrfToken()
    });
}));

module.exports = router;