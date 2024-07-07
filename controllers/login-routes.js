const router = require('express').Router();
const {User} = require('../models');

router.get('/',async (req, res) => {

    try{

        res.render('login');

    }catch{

    }

});

module.exports = router;