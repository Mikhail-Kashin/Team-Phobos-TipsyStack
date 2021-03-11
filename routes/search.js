const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  csrfProtection,
  cocktailQNotFoundError,
} = require("./utils");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { CocktailQ }= require('../db/models');

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const { query } = req.body;
    const questions = await CocktailQ.findAll({
        where: {
            content: {
                [Op.substring] : query
            }
        }
    })

    res.render()
}))