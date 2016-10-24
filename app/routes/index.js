const express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.redirect('/json');
  // res.render('index', { title: 'Express' });
});


router.get('/json/:id?', (req,res,next)=>{
  if(req.params.id) {
    client.get('json', req.params.id).then(data => {
      res.render('json', {
        title : 'Update your json fiddle - DevFiddle', 
        data : data
      } )  
    })
    

  } else {
    res.render('json', {
      title : 'Create a new json fiddle - DevFiddle',
      data : {}
    })
  }
})

module.exports = router;
