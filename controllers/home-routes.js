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
        res.render('homepage', {
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

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('login')
})

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('signup')
})

// single post display
router.get('/post/:id', (req, res) => {
    // get single post including comments
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'text_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text','created_at','user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with that id' })
            return
        }
        const post = dbPostData.get({ plain: true })

        console.log(post)

        res.render('post', {
            post,
            loggedIn: req.session.loggedIn,
            id: req.session.user_id
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// edit post display
router.get('/post/edit/:id', (req, res) => {
    // get single post including comments
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'text_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text','created_at','user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with that id' })
            return
        }
        const post = dbPostData.get({ plain: true })

        console.log(post)

        res.render('edit-post', {
            post,
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