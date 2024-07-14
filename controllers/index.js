const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');
const loginRoutes = require('./login-routes.js');
const homeRoutes = require('./home-routes.js');
const logoutRoutes = require('./logout-routes.js');
router.use('/', loginRoutes);
router.use('/api', apiRoutes);
router.use('/homepage',homeRoutes);
router.use('/dashboard',dashboardRoutes);
router.use('/dashboard/rozier',dashboardRoutes);
router.use('/login',loginRoutes);
router.use('/logout',logoutRoutes);


module.exports = router;