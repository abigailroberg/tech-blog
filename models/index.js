// import all models
const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

// associations
    // 1 user HAS MANY post
User.hasMany(Post, {
    foreignKey: 'user_id'
})

    // 1 post BELONGS TO 1 user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

    // 1 user HAS MANY comment
User.hasMany(Comment, {
    foreignKey: 'user_id'
})

    // 1 comment BELONGs TO 1 user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

    // 1 post HAS MANY comment
Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

    // 1 comment BELONGS TO 1 post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})

module.exports = { User, Post, Comment }