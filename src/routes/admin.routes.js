const express = require('express')
var router = express.Router();
const {isLoggedIn} = require('../lib/auth')
const { renderAdministrator, renderProfileUsers, updateProfile} = require('../controllers/admin.controller')


router.get('/admin', isLoggedIn, renderAdministrator);
router.get('/admin/abmPerfiles',isLoggedIn, renderProfileUsers);
router.post('/admin/abmPerfiles/:id_user', isLoggedIn,updateProfile )

module.exports = router;
