const router = require('express').Router();
const {Post, Comment} = require('../models');
const {Op} = require('sequelize');

router.get('/',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        res.render('dashboard',{posts});

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/:post_id',async (req, res) => {

    try{

        const postID = req.params.post_id;
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
            where:{
                id: postID
            }
        });
        const otherPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
            where:{
                id:{
                    [Op.ne]: postID
                }
            }
        });
        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','post_id'],
            where:{
                post_id: postID
            }
        })
        const posts = allPosts.map(post => post.get({plain: true}));
        const comments = allComments.map(comment =>comment.get({plain: true}));
        const otherPost = otherPosts.map(post=>post.get({plain: true}));
        console.log(comments);

        res.render('dashboard',{posts, comments, otherPost});
        //res.status(200).json(editPost);

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;