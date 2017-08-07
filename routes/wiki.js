const express = require('express'); 
var bodyparser = require('body-parser');
var router = express.Router(); 
var models = require('../models'); 
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
	res.redirect('/wiki/');
}); 

router.post('/', function(req, res, next) {
	var page = Page.build({
		title: req.body.title, 
		content: req.body.content, 
		status: req.body.status
	}); 
	page.save().then(function(success) {
		res.json(success); 
	}).catch(console.error);
}); 

router.get('/add', function(req, res, next) {
	res.render('addPage');  
}); 



module.exports = router; 