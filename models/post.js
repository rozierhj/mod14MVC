const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class Post extends Model {}
Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_post:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        post_title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_date:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            references:{
                model: 'user',
                key:'user_name',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
)

module.exports = Post;