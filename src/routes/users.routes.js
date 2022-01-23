const {Router} = require ('express');
const router = Router();

const {isLoggedIn, isNotLoggedIn } = require('../lib/auth')
const {logOut, signIn , signUp , renderSignUpForm , renderSignInForm} = require('../controllers/users.controller')

router.get('/users/signup', isNotLoggedIn , renderSignUpForm);
router.post('/users/signup',isNotLoggedIn ,signUp);
router.get('/users/signin', isNotLoggedIn , renderSignInForm);
router.post('/users/signin',isNotLoggedIn ,signIn);
router.get('/users/logout', isLoggedIn ,logOut);

module.exports = router;
