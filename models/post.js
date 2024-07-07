const {Model, DataTypes} = require('sequelize');

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
          //  allowNull: false,
        },
        post_title:{
            type: DataTypes.STRING,
           // allowNull: false,
        },
        post_date:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        user_name: {
            type: DataTypes.STRING,
            references:{
                model: 'user',
                key:'user_name',
                onDelete: 'CASCADE',
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