const router = require('express').Router();

router.get('/',async (req, res) => {

    try{

        res.render('dashboard');

    }catch{

    }

});

module.exports = router;