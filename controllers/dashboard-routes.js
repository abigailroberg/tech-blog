const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

// render dashboard
router.get('/', (req, res) => {
    res.render('dashboard')
})

module.exports = router