
    const router = require('express').Router();
    const {User} = require('../../models');
    
    router.post('/add', async(req, res)=>{
        try{
    
            await User.create({
    
                user_name: req.body.user_name,
                password: req.body.password,
            });
           // console.log('added post',newPost);
            res.status(200).json(req.body);
    
        }catch(err){
            res.status(500).json(err);
        }
    
    });

  

    module.exports = router;
