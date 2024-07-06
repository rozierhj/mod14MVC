const router = require('express').Router();
const {Comment, Post} = require('../../models');

router.post('/add', async(req, res)=>{

    try{

        const newComment = await Comment.create({

            post_comment: req.body.post_comment,
            post_id: req.body.post_id,

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

router.get('/get/:id', async(req, res)=>{


    try{

        const comment = await Comment.findOne({where:{id:req.params.id}});

        
        const commentData = comment.get({plain:true})
        
        console.log('555555555555555555555555555555555555555555555555555555555555555555555555555',commentData);
        res.status(200).json(commentData.post_id);

    }catch(err){
        res.status(500).json(err);
    }

});

// router.delete('/delete/:id', async(req, res)=>{

//     try{

//         const post = await Post.findByPk(req.params.id);

//         if(!post){
//             res.status(404).json({message:'could not find post'});
//             return;
//         }

//         await post.destroy();
//         res.status(200).json({message:'deletion succesful'});

//     }catch(err){
//         res.status(500).json(err);
//     }

// });



module.exports = router;