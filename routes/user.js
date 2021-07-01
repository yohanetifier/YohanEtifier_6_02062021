const express = require('express');
const router = express.Router(); 
const userCtrl = require('../controllers/user')
const accountLimiter = require('./accountlimiter')
 
// route for user 

router.post('/signup', userCtrl.signup)
router .post('/login', accountLimiter, userCtrl.login)

module.exports = router; 