const router = require('express').Router();

router.get('/',async (req, res) => {

    try{

        res.render('page');

    }catch{

    }

});

module.exports = router;