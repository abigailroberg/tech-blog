const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

// render dashboard
router.get('/:id', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.params.id
        },
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
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            id: req.session.user_id
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router