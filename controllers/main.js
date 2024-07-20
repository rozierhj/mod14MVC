const router = require('express').Router();
const {Post, Comment} = require('../models');
const {Op} = require('sequelize');


router.get('/',async (req, res) => {


    const currentUser = req.session.user_name;
    
    try{
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => b.id - a.id);

        
        if(currentUser !== null && currentUser !== undefined && currentUser !== ''){
            res.render('homepage',{posts, showContent:false, noUser:false, loginUser:false, currentUser, isFirstPage:true});
        }
        else{
            res.render('homepage',{posts, showContent:false, noUser:true, loginUser:false, isFirstPage:true});
        }

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/login', async (req, res) =>{

    try{
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => b.id - a.id);

        res.render('homepage',{posts, showContent:false, loginUser:true, isFirstPage:true});

    }catch(err){
        res.status(500).json(err);
    }


});

router.get('/createAccount', async (req, res) =>{

    try{
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => b.id - a.id);

        res.render('homepage',{posts, showContent:false, createUser:true, isFirstPage:true});

    }catch(err){
        res.status(500).json(err);
    }


});

module.exports = router;



