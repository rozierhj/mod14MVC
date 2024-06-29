const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes.js');
const pageRoutes = require('./page-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const logoutRoutes = require('./logout-routes.js');
router.use('/', loginRoutes);
router.use('/api', apiRoutes);
router.use('/home',homeRoutes);
router.use('/dashboard',dashboardRoutes);
router.use('/page',pageRoutes);
router.use('/login',loginRoutes);
router.use('/logout',logoutRoutes);


module.exports = router;