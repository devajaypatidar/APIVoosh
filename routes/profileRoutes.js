const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const {getAllProfile,getPublicProfile,updateUser,getProfile} = require('../controllers/profileController');
const verifyToken = require('../middleware/auth')

router.get('/all',verifyToken,isAdmin,getAllProfile);
router.get("/public",verifyToken,getPublicProfile);
router.get("/getuser",verifyToken,getProfile);
router.put("/update",verifyToken,updateUser);
module.exports = router;