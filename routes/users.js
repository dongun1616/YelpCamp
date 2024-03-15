const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');


router.route('/register')
    .get(users.renderRegister) //register 폼
    .post(wrapAsync(users.register))  //register 라우트

router.route('/login')
    .get(users.renderLogin) //login 폼
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login) //login 라우트

router.get('/logout', users.logout); //logout 라우트

module.exports = router;