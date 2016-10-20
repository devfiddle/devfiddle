const express = require('express');
const client = new require('../client')();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/:app' , (req,res,next ) => {
    client.save(req.params.app, {data : req.body} )
        .then(app => {
            res.status(200).json(app);
        }).catch(err=>{
            console.log(err);
            res.status(500).json(err);
    })
})

module.exports = router;
