const router = require('express').Router();
const { User } = require('../../models');

router.get('/:user_name', async(req, res) =>{
  
    try{
        const user = await User.findOne({
            attributes:['id','user_name','password'],
            where:{
                user_name: req.params.user_name
            }
        });

        
       // const users = allUsers.map(user => user.get({plain: true}));
       
       const userData = user.get({plain:true});
        res.status(200).json(userData);

    }catch(err){
        res.status(500).json(err);
    }

});

router.post('/add', async(req, res)=>{
    console.log('gggggggggggggggggggggggggggggggggggggggggffffffffffffffffffffff');
    console.log(req.body.user_name);
    console.log(req.body.password);
    try{
        const newUser = await User.create({

            user_name: req.body.user_name,
            password: req.body.password,

        });
        console.log(newUser);
        req.session.save(() =>{
            req.session.loggedIn = true;
            req.session.user = newUser.get({plain: true});
            res.status(200).json(newUser);
        });
        res.status(200).json(newPost);

    }catch(err){
        res.status(500).json(err);
    }

});
module.exports = router;