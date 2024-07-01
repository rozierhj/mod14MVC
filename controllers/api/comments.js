const router = require('express').Router();
const {Comment, Post} = require('../../models');

router.post('/add', async(req, res)=>{

    try{

        const newPost = await Comment.create({

            post_comment: req.body.post_comment,
            post_id: req.body.post_id,

        });
       // console.log('added post',newPost);
        res.status(200).json(newPost);

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