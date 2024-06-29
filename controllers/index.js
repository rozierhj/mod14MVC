const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const login = require('./login-routes.js');
router.use('/', login);
router.use('/api', apiRoutes);

module.exports = router;