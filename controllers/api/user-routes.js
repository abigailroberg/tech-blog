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
        req.session.save(() => {
          req.session.user_id = dbUserData.id
          req.session.username = dbUserData.username
          req.session.loggedIn = true
  
          res.json(dbUserData)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  })

// login post route
router.post('/login', (req, res) => {
    console.log('login api running')
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        // check username
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username found!' })
            return
        }

        // check password
        const validPw = dbUserData.checkPassword(req.body.password)

        if(!validPw) {
            res.status(404).json({ message: 'Incorrect password!' })
            return
        }

        // start session
        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.loggedIn = true

            res.json({ user: dbUserData, message: 'You are now logged in' })
        })
    })
})

// logout post route
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
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

module.exports = router