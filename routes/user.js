const express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  User.findAll({}).then(function(users) {
    res.render('users', {users: users});
  });
})

router.get('/:id', function(req, res, next) {
  var user = User.findOne({
    where: {
      id: req.params.id
    }
  })
  var page = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([user, page]).then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('user', {pages: pages, user: user});
  }).catch(next);
})



module.exports = router;
