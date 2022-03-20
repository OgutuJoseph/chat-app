const express = require('express');
const router = express.Router(); 
const validateForm = require('../controllers/validateForm');
const { handleLogin, attemptLogin, attemptRegister } = require('../controllers/authController');


// router
//     .route('/login')
//     // .get(authController.handleLogin)
//     .get(handleLogin)
//     .post(validateForm, attemptLogin);

router.route('/login').get(handleLogin).post(validateForm, attemptLogin);

router.post('/register', validateForm, attemptRegister);

module.exports = router;