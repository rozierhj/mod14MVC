const router = require('express').Router();
const {Post, Comment} = require('../models');
const {Op} = require('sequelize');

//dashboard page
router.get('/',async (req, res) => {

    const currentUser = req.session.user_name;


    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            where:{
                user_name: req.session.user_name
            }
        });

        const posts = allPosts.map(post => post.get({plain: true}));
        posts.sort((a, b) => b.id - a.id);
        
            res.render('dashboard',{posts, noUser:false, currentUser});
       

    }catch(err){
        res.status(500).json(err);
    }

});

//dashboard page when a user is creating a new post
router.get('/newpost',async (req, res) => {
    
    const currentUser = req.session.user_name;

    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            where:{
                user_name:req.session.user_name
            }
        });

        const posts = allPosts.map(post => post.get({plain: true, }));

        posts.sort((a, b) => b.id - a.id);

        res.render('dashboard',{posts, newPost:true, noUser:false,currentUser});

    }catch(err){
        res.status(500).json(err);
    }

});

//dashboard page when a user is viewing/editing their post
router.get('/:post_id',async (req, res) => {
    const currentUser = req.session.user_name;

    try{
        const postID = req.params.post_id;
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            where:{
                user_name:req.session.user_name                }
            });
            const editPosts = await Post.findAll({
                attributes:['id','blog_post','post_title','post_date','user_name'],
                where:{
                    id: req.params.post_id,
                    user_name:req.session.user_name
                }
            });
            
            const posts = allPosts.map(post => post.get({plain: true}));
            posts.sort((a, b) => b.id - a.id);
            const editPost = editPosts.map(post => post.get({plain: true}));
            res.render('dashboard',{posts, editPost, noUser:false,currentUser});
        

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;