const router = require('express').Router();
const { User } = require('../../models');

// router.post('/', async (req, res) => {
//   try {
//     const newUser = await User.create({
//       username: req.body.username,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (!userData) {
//       res.status(400).json({ message: 'Password or email was incorrect' });
//       return;
//     }

//     const testPassword = await userData.checkPassword(req.body.password);

//     if (!testPassword) {
//       res.status(400).json({ message: 'Password or email was incorrect' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json({ user: userData, message: 'You are logged in' });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

router.get('/:user_name', async(req, res) =>{
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllllllll');
  
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


module.exports = router;