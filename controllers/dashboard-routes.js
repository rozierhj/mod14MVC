const router = require('express').Router();
const {Post, Comment} = require('../models');
const {Op} = require('sequelize');

router.get('/',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });
        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_name'],
        })

        const posts = allPosts.map(post => post.get({plain: true}));
        const comments = allComments.map(comment =>comment.get({plain: true}));
        res.render('dashboard',{posts, comments});

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/:user_name',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            where:{
                user_name:req.params.user_name
            }
        });
        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_name'],
        })

        const posts = allPosts.map(post => post.get({plain: true}));
        const comments = allComments.map(comment =>comment.get({plain: true}));
        res.render('dashboard',{posts, comments});

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/:post_id',async (req, res) => {

    try{

        const postID = req.params.post_id;
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            // where:{
            //     id: postID
            // }
        });
        const otherPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
                where:{
                    id: postID
                }
        });
        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_name'],
            where:{
                post_id: postID
            }
        })
        if(allComments.length < 1){
            res.json({response:false});
        }
        else{

            const posts = allPosts.map(post => post.get({plain: true}));
            posts.sort((a, b) => a.id - b.id);
            const comments = allComments.map(comment =>comment.get({plain: true}));
            comments.sort((a, b) => a.id - b.id);
            const otherPost = otherPosts.map(post=>post.get({plain: true}));
            res.render('dashboard',{posts, comments, otherPost});
            //res.status(200).json(editPost);
        }

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/:user_name/:post_id',async (req, res) => {

    try{
        
        const postID = req.params.post_id;
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            // where:{
                //     id: postID
                // }
            });
            const editPosts = await Post.findAll({
                attributes:['id','blog_post','post_title','post_date','user_name'],
                where:{
                    id: req.params.post_id,
                    user_name:req.params.user_name
                }
            });
            
            const posts = allPosts.map(post => post.get({plain: true}));
            posts.sort((a, b) => a.id - b.id);
            const editPost = editPosts.map(post => post.get({plain: true}));
            res.render('dashboard',{posts, editPost});
        

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;