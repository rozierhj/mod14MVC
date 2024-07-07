const router = require('express').Router();
const {Post, Comment} = require('../models');

router.get('/',async (req, res) => {

    try{

        res.render('dashboard');

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/:user_id',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_id'],
            where:{
                user_id:req.params.user_id
            }
        });
        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_id'],
        })

        const posts = allPosts.map(post => post.get({plain: true}));
        const comments = allComments.map(comment =>comment.get({plain: true}));
        res.render('dashboard',{posts, comments});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;