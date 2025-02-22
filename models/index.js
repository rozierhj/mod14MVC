const Post = require('./post');
const User = require('./User');
const Comment = require('./comment');

Comment.belongsTo(Post,{
  foreignKey:'post_id',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment,{
  foreignKey: 'post_id',
  onDelete:'CASCADE',
});

Comment.belongsTo(User,{
  foreignKey:'user_name',
  onDelete: 'CASCADE',
});

User.hasMany(Comment,{
  foreignKey: 'user_name',
  onDelete:'CASCADE',
});

Post.belongsTo(User,{
  foreignKey:'user_name',
  onDelete: 'CASCADE',
});

User.hasMany(Post,{
  foreignKey: 'user_name',
  onDelete:'CASCADE',
});

module.exports = { Post, User, Comment};