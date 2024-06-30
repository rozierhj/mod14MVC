const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const loginModal = require('./login-modal.js');
const posts = require('./posts.js');

// alert('api routes');


router.use('/loginModal', loginModal);
router.use('/users', userRoutes);
router.use('/post',posts);



module.exports = router;