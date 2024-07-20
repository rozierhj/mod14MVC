const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

//test to see if the username that is trying to be added already exist
router.get('/check/:user_name', async(req, res) =>{
  
    try{
        const user = await User.findOne({
            attributes:['id','user_name','password'],
            where:{
                user_name: req.params.user_name
            }
        });

        if(!user){
            res.status(200).json({hasUser:false});
        }
        else{
            res.status(200).json({hasUser:true});
        }

    }catch(err){
        res.status(500).json(err);
    }

});

//add a new user
router.post('/add', async(req, res)=>{

    console.log(req.body.user_name);
    console.log(req.body.password);
    try{
        const newUser = await User.create({

            user_name: req.body.user_name,
            password: req.body.password,

        });
        console.log(newUser);
        req.session.save(() =>{
            req.session.user_name = newUser.user_name;
            req.session.loggedIn = true;
            res.status(200).json(newUser);
        });


    }catch(err){
        res.status(500).json(err);
    }

});

//login a user
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

                res.status(200).json({
                    message: "logged in", 
                    session: {
                        loggedIn: req.session.loggedIn,
                        user_name: req.session.user_name
                    }
                });

            });
        }

    }
    catch(err){

        res.status(500).json(err);
    }

});

//logout a user
router.post('/logout', async (req, res) =>{

    if(req.session.user_name !== '' && req.session.user_name !== null && req.session.user_name !== undefined){
        req.session.destroy(()=>{
            res.status(204).end();
        });
    }
    else{
        res.status(404).end();
    }

});

//test to see if there is an active session user
router.get('/userSearch', async (req, res)=>{



    try{


        if(req.session.loggedIn === true){
            res.status(200).json({loggedIn:true});
        }
        else{
            res.status(200).json({loggedIn:false})
        }
    }
    catch(err){


        res.status(504).json(err);
    }

});

module.exports = router;