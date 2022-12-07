var express = require('express');
var router = express.Router();

const auth=require('../middleware/auth');
const checkTextMessageCode = require('../middleware/checkTextMessageCode');

const logout=require('../middleware/logout');
const sendTextMessageCode = require('../middleware/sendTextMessageCode');

const index=require('../services/index')

router.get('/', auth,function(req, res, next) {
  index(res);
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', checkTextMessageCode,sendTextMessageCode, function(req, res, next) {
//the idea is, if the user already has the text msg code that hasn't expired, if he closes the page, he can use the code without having to input his phone number
});

router.get('/logout',logout, function(req, res, next) {
  
});



module.exports = router;
