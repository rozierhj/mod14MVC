const router = require('express').Router();

const userRoutes = require('./users.js');
const login = require('./login.js');
const posts = require('./posts.js');
const comments = require('./comments.js');

// alert('api routes');


router.use('/login', login);
router.use('/users', userRoutes);
router.use('/post',posts);
router.use('/comment',comments);



module.exports = router;