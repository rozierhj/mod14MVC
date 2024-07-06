const router = require('express').Router();
const {Post, Comment} = require('../models');
const {Op} = require('sequelize');

router.get('/',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => a.id - b.id);

        res.render('homepage',{posts});

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/:post_id',async (req, res) => {

    try{

        const postID = req.params.post_id;
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
            // where:{
            //     id: postID
            // }
        });
        const otherPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
                where:{
                    id: postID
                }
        });
        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','post_id'],
            where:{
                post_id: postID
            }
        })
        if(allComments.length < 1){
            res.json({response:false});
        }
        else{

            const posts = allPosts.map(post => post.get({plain: true}));
            const comments = allComments.map(comment =>comment.get({plain: true}));
            const otherPost = otherPosts.map(post=>post.get({plain: true}));
            res.render('homepage',{posts, comments, otherPost});
            //res.status(200).json(editPost);
        }

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;