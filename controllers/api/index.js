const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const loginModal = require('./login-modal.js');
const addPost = require('./add-post.js');

// alert('api routes');


router.use('/loginModal', loginModal);
router.use('/users', userRoutes);
router.use('/addPost',addPost);



module.exports = router;