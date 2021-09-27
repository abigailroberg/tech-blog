const router = require('express').Router()
const { User, Post, Comment } = require('../../models')

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id','username']
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// get 1 user by id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'username'],
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'text_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// create new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// delete user by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found wit this id' })
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router