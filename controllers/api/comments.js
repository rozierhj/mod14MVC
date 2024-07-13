const router = require('express').Router();
const {Comment, Post} = require('../../models');

router.post('/add', async(req, res)=>{

    try{

        const newComment = await Comment.create({

            post_comment: req.body.post_comment,
            post_id: req.body.post_id,
            comment_date: new Date(),
            user_name: req.body.user_name,

        });
       // console.log('added post',newPost);
        res.status(200).json(newComment);

    }catch(err){
        res.status(500).json(err);
    }

});

router.put('/edit/:id', async(req, res)=>{


    try{

        const comment = await Comment.findOne({where:{id:req.params.id}});

        await Comment.update(
            
        {post_comment: req.body.post_comment,},
        {where: {id: req.body.id}});

        res.status(200).json(comment);

    }catch(err){
        res.status(500).json(err);
    }

});

router.get('/:user_name/get/:id', async(req, res)=>{


    try{

        const comment = await Comment.findOne({where:{id:req.params.id}});

        
        const commentData = comment.get({plain:true})
        
        res.status(200).json(commentData.post_id);

    }catch(err){
        res.status(500).json(err);
    }

});

router.delete('/delete/:id', async(req, res)=>{

    try{

        const comment = await Comment.findByPk(req.params.id);
        const commentCount = await Comment.findAll();
        const commentCountTotal = commentCount.length;

        if(!comment){
            res.status(404).json({message:'could not find post'});
            return;
        }

        await comment.destroy();
        res.status(200).json({length:`${commentCountTotal}`});

    }catch(err){
        res.status(500).json(err);
    }

});



module.exports = router;