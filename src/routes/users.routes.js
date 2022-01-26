const {Router} = require ('express');
const router = Router();

const {isLoggedIn, isNotLoggedIn } = require('../lib/auth')
const {logOut, signIn , signUp , renderSignUpForm , renderSignInForm, renderEditProfile, renderProfile} = require('../controllers/users.controller')

router.get('/users/signup', isNotLoggedIn , renderSignUpForm);
router.post('/users/signup',isNotLoggedIn ,signUp);
router.get('/users/signin', isNotLoggedIn , renderSignInForm);
router.post('/users/signin',isNotLoggedIn ,signIn);
router.get('/users/logout', isLoggedIn ,logOut);
router.get('/users/editProfile', isLoggedIn, renderEditProfile)
// router.post ('/users/editProfile', isLoggedIn, editProfile)
router.get('/users/Profile', isLoggedIn, renderProfile)

module.exports = router;
