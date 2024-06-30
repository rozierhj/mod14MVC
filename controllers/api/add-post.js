const router = require('express').Router();
const {Post} = require('../../models');

router.post('/', async(req, res)=>{

    try{

        const newPost = await Post.create({

            blog_post: req.body.blog_post,
            post_title: req.body.post_title,

        });
        console.log('added post',newPost);
        res.status(200).json(newPost);

    }catch(err){
        res.status(500).json(err);
    }

});



module.exports = router;