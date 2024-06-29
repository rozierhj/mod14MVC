const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const loginModal = require('./login-modal.js');

// alert('api routes');


router.use('/loginModal', loginModal);
router.use('/users', userRoutes);



module.exports = router;