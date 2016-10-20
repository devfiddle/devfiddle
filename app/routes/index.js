const express = require('express');
const client = require('../client');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.redirect('/json');
  res.render('index', { title: 'Express' });
});


router.get('/json/:id?', (req,res,next)=>{
  if(req.params.id) {
    
    console.log(req.params.id); 
  } else {
    res.render('json', {})
  }
})

module.exports = router;
