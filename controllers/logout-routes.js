const router = require('express').Router();

router.get('/',async (req, res) => {

    try{

        res.render('login');

    }catch{

    }

});

module.exports = router;