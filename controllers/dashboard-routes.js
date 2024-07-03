const router = require('express').Router();
const {Post, Comment} = require('../models');

router.get('/',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
        });

        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','post_id'],
        })
       // console.log(allPosts);
        const posts = allPosts.map(post => post.get({plain: true}));
        //console.log(post);
        const comments = allComments.map(comment =>comment.get({plain: true}));

        res.render('dashboard',{posts, comments});

    }catch(err){
        res.status(500).json(err);
    }

});


module.exports = router;