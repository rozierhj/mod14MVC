const router = require('express').Router();
const {Post, Comment} = require('../models');

router.get('/',async (req, res) => {

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
        });
       // console.log(allPosts);
        const posts = allPosts.map(post => post.get({plain: true}));
        //console.log(post);
        res.render('dashboard',{posts});

    }catch(err){
        res.status(500).json(err);
    }

});


module.exports = router;