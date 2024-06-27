const Post = require('./post');
const User = require('./User');

Post.belongsTo(User,{
    foreignKey: 'user_name',
  });

User.hasMany(Post,{
    foreignKey:'user_name',
});

module.exports = { Post, User, };