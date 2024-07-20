const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');
const homeRoutes = require('./home-routes.js');
const rootRoutes = require('./main.js');
router.use('/', rootRoutes);
router.use('/api', apiRoutes);
router.use('/homepage',homeRoutes);
router.use('/dashboard',dashboardRoutes);


module.exports = router;