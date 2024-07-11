const router = require('express').Router();
const {Post, Comment} = require('../models');
const {Op} = require('sequelize');

router.get('/',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => b.id - a.id);

        res.render('homepage',{posts, showContent:false});

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/newPost',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => b.id - a.id);

        res.render('homepage',{posts, showContent:true});

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
            const posts = allPosts.map(post => post.get({plain: true}));
            posts.sort((a, b) => b.id - a.id);
            const comments = allComments.map(comment =>comment.get({plain: true}));
            comments.sort((a, b) => b.id - a.id);
            const otherPost = otherPosts.map(post=>post.get({plain: true}));
            console.log(otherPost)
            console.log(comments);
            res.render('homepage',{posts, comments, otherPost});
            //res.status(200).json(editPost);
        

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;