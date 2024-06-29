
    const router = require('express').Router();
    
    router.get('/', async (req, res) =>{
        
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% API/loginModal/get %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        try{
            // const theModal = new bootstrap.Modal(document.getElementById('myModal'), {});
            // theModal.show();
            res.status(200).json({ message: 'Modal open for business' });

        }catch(err){
            res.status(500).json(err);
        }

    })

  

    module.exports = router;
