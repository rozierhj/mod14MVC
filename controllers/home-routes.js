const router = require('express').Router();
const {Post, Comment} = require('../models');
const {Op} = require('sequelize');

//homepage
router.get('/',async (req, res) => {

    const currentUser = req.session.user_name;
    
    try{
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => b.id - a.id);

        
        if(currentUser !== null && currentUser !== undefined && currentUser !== ''){
            res.render('homepage',{posts, showContent:false, noUser:false, loginUser:true, currentUser, isFirstPage:false});
        }
        else{
            res.render('homepage',{posts, showContent:false, noUser:true, loginUser:true, isFirstPage:false});
        }

    }catch(err){
        res.status(500).json(err);
    }

});

//homepage when a new post is being create
router.get('/newPost',async (req, res) => {
    const currentUser = req.session.user_name;
    try{

        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
        });

        const posts = allPosts.map(post => post.get({plain: true}));

        posts.sort((a, b) => b.id - a.id);

        res.render('homepage',{posts, showContent:true, newPost:true, noUser:false, currentUser});

    }catch(err){
        res.status(500).json(err);
    }

});

//homepage when another users post is being viewed
router.get('/post/:post_id',async (req, res) => {
    const currentUser = req.session.user_name;

    try{
        const postID = req.params.post_id;
        const userName = req.session.user_name;
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
                post_id: postID,
                user_name:{
                    [Op.ne]: userName
                }
            }
        })
        const userComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_name'],
            where:{
                post_id: postID,
                user_name: userName
            }
        })
            const posts = allPosts.map(post => post.get({plain: true}));
            posts.sort((a, b) => b.id - a.id);
            const comments = allComments.map(comment =>comment.get({plain: true}));
            comments.sort((a, b) => b.id - a.id);
            const otherPost = otherPosts.map(post=>post.get({plain: true}));
            const userComment = userComments.map(comment =>comment.get({plain: true}));
            userComment.sort((a, b) => b.id - a.id);

            res.render('homepage',{posts, comments, otherPost, userComment, noUser:false,currentUser});
            //res.status(200).json(editPost);
        

    }catch(err){
        res.status(500).json(err);
    }

});

//homepage when a user is editing their post
router.get('/myPost/:post_id',async (req, res) => {
    const currentUser = req.session.user_name;


    try{
        const postID = req.params.post_id;
        const userName = req.session.user_name;
        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            // where:{
            //     id: postID
            // }
        });
        const ourUserPosts = await Post.findAll({
            attributes:['id','blog_post','post_title','post_date','user_name'],
                where:{
                    id: postID,
                    user_name: userName
                }
        });
        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_name'],
            where:{
                post_id: postID,
                user_name:{
                    [Op.ne]: userName
                }
                
            }
        })
        const userComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_name'],
            where:{
                post_id: postID,
                user_name: userName
            }
        })
            const posts = allPosts.map(post => post.get({plain: true}));
            posts.sort((a, b) => b.id - a.id);
            const comments = allComments.map(comment =>comment.get({plain: true}));
            comments.sort((a, b) => b.id - a.id);
            const userComment = userComments.map(comment =>comment.get({plain: true}));
            userComment.sort((a, b) => b.id - a.id);
            const ourUserPost = ourUserPosts.map(post=>post.get({plain: true}));
            
            console.log(ourUserPost);

            res.render('homepage',{posts, comments, ourUserPost, userComment, noUser: false,currentUser});
            //res.status(200).json(editPost);
        

    }catch(err){
        res.status(500).json(err);
    }

});

//homepage when a user is creating a comment on their own a post
router.get('/myPost/:post_id/newComment',async (req, res)=>{

    const currentUser = req.session.user_name;

    try{

        const postID = req.params.post_id;
        const user = req.session.user_name;

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
            // console.log(otherPost)
            // console.log(comments);
            res.render('homepage',{posts, comments, otherPost, showContent:true, hasUser:true, noUser:false,currentUser});
            //res.status(200).json(editPost);

    }
    catch(err){
        console.error(err);
    }

});

//homepage when a user is creating a comment on another users post
router.get('/post/:post_id/newComment',async (req, res)=>{
    const currentUser = req.session.user_name;


    try{

        const postID = req.params.post_id;
        const user = req.session.user_name;
        
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
            // console.log(otherPost)
            // console.log(comments);
            res.render('homepage',{posts, comments, otherPost, showContent:true, hasUser:true, noUser:false,currentUser});
            //res.status(200).json(editPost);

    }
    catch(err){
        console.error(err);
    }

});

//homepage when a user is viewing a comment on their post
router.get('/myPost/:post_id/:comment_id',async (req, res)=>{
    const currentUser = req.session.user_name;

    try{

        const postID = req.params.post_id;
        const commID = req.params.comment_id;

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
                post_id: postID,
                id:{
                    [Op.ne]: commID
                }
            }
        });
        const myComments = await Comment.findAll({
            attributes: ['id','post_comment','comment_date','post_id','user_name'],
            where:{
                id: commID
            }
        });
            const posts = allPosts.map(post => post.get({plain: true}));
            posts.sort((a, b) => b.id - a.id);
            const comments = allComments.map(comment =>comment.get({plain: true}));
            comments.sort((a, b) => b.id - a.id);
            const otherPost = otherPosts.map(post=>post.get({plain: true}));
            const editComment = myComments.map(post=>post.get({plain: true}));
            // console.log(otherPost)
            // console.log(comments);
            res.render('homepage',{posts, editComment, otherPost, comments, hasUser:true, noUser:false,currentUser});
            //res.status(200).json(editPost);

    }
    catch(err){
        console.error(err);
    }

});

module.exports = router;