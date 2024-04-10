const express = require('express');

const router = express.Router();
const {registerController , loginController} = require('../controllers/authController')

router.post('/register',registerController );


router.post('/login',loginController );

router.get('/google',googleLogin);
router.get("/google/callback",googleCallback);
router.get("/logout",logout);

module.exports = router;
