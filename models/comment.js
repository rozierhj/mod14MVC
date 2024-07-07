const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection.js');

class Comment extends Model {}
Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_comment:{
            type: DataTypes.TEXT,
          //  allowNull: false,
        },
        comment_date:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        post_id: {
             type: DataTypes.INTEGER,
             references:{
                 model: 'post',
                 key:'id',
                 onDelete: 'CASCADE',
             },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key:'id',
                onDelete: 'CASCADE',
            },
       },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
)

module.exports = Comment;