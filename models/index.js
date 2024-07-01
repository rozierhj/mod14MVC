const Post = require('./post');
const User = require('./User');
const Comment = require('./comment');

// Post.belongsTo(User,{
//     foreignKey: 'user_name',
//   });

// User.hasMany(Post,{
//     foreignKey:'user_name',
// });

Comment.belongsTo(Post,{
  foreignKey:'post_id',
});

Post.hasMany(Comment,{
  foreignKey: 'post_id',
});

module.exports = { Post, User, Comment};