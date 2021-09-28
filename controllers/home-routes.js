const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        title: 'Post Title to Format Homepage',
        text_content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi provident et molestiae repudiandae labore sunt iste unde dolore magnam, placeat suscipit consequuntur atque! Voluptas quasi dolorum magnam quo rerum temporibus.',
        created_at: new Date(),
        user: {
            username: 'test user'
        }
    })
})

module.exports = router