const router = require('express').Router();
const {Post} = require('../../models');

router.post('/add', async(req, res)=>{
    console.log('################################### we added post ################################');
    try{

        const newPost = await Post.create({

            blog_post: req.body.blog_post,
            post_title: req.body.post_title,

        });
       // console.log('added post',newPost);
        res.status(200).json(newPost);

    }catch(err){
        res.status(500).json(err);
    }

});

router.put('/edit/:id', async(req, res)=>{

    console.log('################################### we edited post ################################');
    try{

        const editPost = await Post.update(
            
        {blog_post: req.body.blog_post,
        post_title: req.body.post_title,},
        {where: {id: req.body.id}});

        
       // console.log('added post',newPost);
        res.status(200).json(editPost);

    }catch(err){
        res.status(500).json(err);
    }

});

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

module.exports = router;