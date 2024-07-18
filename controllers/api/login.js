
    const router = require('express').Router();
    const {User} = require('../../models');
    
    router.post('/', async(req, res)=>{
        try{
    
            const newUser = await User.create({
    
                user_name: req.body.user_name,
                password: req.body.password,
            });

            req.session.save(() =>{

                req.session.loggedIn = true;
                req.session.user_name = newUser.user_name;

                res.status(200).json(newUser);

            });
           // console.log('added post',newPost);
    
        }catch(err){
            res.status(500).json(err);
        }
    
    });

    router.post('/login', async (req, res) =>{

        try{
            //find user in DB
            const userDB = await User.findOne({
                where:{
                    user_name: req.body.user_name,
                },
            });
            if(!userDB){
                res.status(400).json({message:'Incorrect user name or password'});
                return;
            }
            const goodPassword = await bcrypt.compare(req.body.password, userDB.password);

            if(!goodPassword){
                res.status(400).json({message: 'Incorrect user name or password'});
                return;
            }
            else{
                req.session.save(() =>{

                    req.session.loggedIn = true;
                    req.session.user_name = userDB.user_name;
    
                    res.status(200).json({message: "logged in"});
    
                });
            }

        }
        catch(err){
            res.status(500).json(err);
        }

    });

    module.exports = router;
