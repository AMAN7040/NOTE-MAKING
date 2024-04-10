const express = require('express');
const router = express.Router();

const{getSiginPage, getSignupPage, makeSignup, userSignin, logoutUser} = require('../controllers/user');

router.get('/signin', getSiginPage );

router.get('/signup', getSignupPage );

router.post('/signup', makeSignup );

router.post('/signin', userSignin);

router.get('/logout', logoutUser);

module.exports = router;