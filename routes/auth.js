const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');


router.post('/signup', authController.postSignUp);

router.post('/login', authController.postLogin);

router.post('/reset', authController.postReset);

router.post('/reset/:token', authController.verifyReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
