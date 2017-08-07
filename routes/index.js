const wikiRouter = require('./wiki');
const userRouter = require('./user'); 
const express = require('express'); 
var router = express.Router(); 

router.use('/wiki', wikiRouter); 
router.use('/user', userRouter);

router.get('/', function(req, res, next) {
	res.render('index');
}); 


module.exports = router;  