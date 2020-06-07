const router = require('express').Router();
let loginController = require('../controllers/login.controller');
let signinController = require('../controllers/signin.controller');

router.route('/signin').post(signinController.userSignin);
router.route('/login').post(loginController.userLogin);

module.exports = router;