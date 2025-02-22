const router = require('express').Router();
const {Post, Comment} = require('../../models');

//create a post
router.post('/add', async(req, res)=>{
    try{
        const newPost = await Post.create({

            blog_post: req.body.blog_post,
            post_title: req.body.post_title,
            post_date: new Date(),
            user_name: req.session.user_name,

        });
        res.status(200).json(newPost);

    }catch(err){
        res.status(500).json(err);
    }

});
//edit a post
router.put('/edit/:id', async(req, res)=>{

    try{

        const editPost = await Post.update(
            
        {blog_post: req.body.blog_post,
        post_title: req.body.post_title,},
        {where: {id: req.body.id}});

        res.status(200).json(editPost);

    }catch(err){
        res.status(500).json(err);
    }

});
//delete a post
router.delete('/delete/:id', async(req, res)=>{

    try{
        
        const post = await Post.findByPk(req.params.id);
        
        if(!post){
            res.status(404).json({message:'could not find post'});
            return;
        }
        
        await post.destroy();
        res.status(200).json({message:'deletion succesful'});

    }catch(err){
        res.status(500).json(err);
    }

});
//get the post id of a comment
router.get('/comments/:post_id',async (req, res) => {

    console.log('y');
    try{


        const allPosts = await Post.findAll({
            attributes:['id','blog_post','post_title'],
        });

        const postID = req.params.post_id;

        const allComments = await Comment.findAll({
            attributes: ['id','post_comment','post_id'],
            where:{
                post_id: postID
            }
        })
        if(allComments.length < 1){
            console.log('');
        }
        const posts = allPosts.map(post => post.get({plain: true}));
        const comments = allComments.map(comment =>comment.get({plain: true}));


        res.render('homepage',{posts, comments});
        //res.status(200).json(editPost);

    }catch(err){
        res.status(500).json(err);
    }

});
//get a post
router.get('/:id', async(req, res) =>{

    try{
        
        const post = await Post.findOne({
            attributes:['id','blog_post','post_title','post_date','user_name'],
            where:{id:req.params.id},
        });

        const selectPost = post.get({plain: true});
        
        if(!post){
            res.status(404).json({message:'Post not found'});
            return;
        }

        const response = {
            selectPost,
            currentUser : req.session.user_name
        };

        console.log(response);
        res.status(200).json(response);

    }catch(err){
        res.status(500).json(err);
    }

} );

module.exports = router;