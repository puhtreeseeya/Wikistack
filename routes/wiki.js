const express = require('express');
var bodyparser = require('body-parser');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
	Page.findAll({}).then(function(pages) {
		res.render('index',{pages: pages});
	})
});

router.post('/', function(req, res, next) {

	User.findOrCreate({
		where : {
			name: req.body.authorName,
			email: req.body.authorEmail
		}
	}).then(function(values) {

		var user = values[0];
		var page = Page.build({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status
		});

		return page.save().then(function (page) {
			return page.setAuthor(user);
		});

	}).then(function(page) {
		res.redirect(page.route);
	})
	.catch(next);

});

router.get('/add', function(req, res, next) {
	res.render('addPage');
});

router.get('/:urlTitle', function(req, res, next) {
	// res.send('hit dynamic route at ' + req.params.urlTitle);
	Page.findOne({
		where: {
			urlTitle : req.params.urlTitle
		}
	}).then(function(page)
	{
		User.findOne({
			where: {
				id : page.authorId
			}
		}).then(function(user) {
			res.render('wikipage',{page: page.dataValues, user: user.dataValues})
		});
	}).catch(next);

});


module.exports = router;
