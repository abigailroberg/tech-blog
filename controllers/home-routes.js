const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'text_content',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render('homepage', { posts })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('login')
})

module.exports = router