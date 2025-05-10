const { handleSignup,handleLogin,handleLogout } = require('../controllers/user');
const express = require('express');
const router = express.Router();
router.post('/', handleSignup);
router.post('/login',handleLogin);
router.post('/logout', handleLogout);
module.exports = router;