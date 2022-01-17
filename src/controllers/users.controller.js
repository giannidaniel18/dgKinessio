const passport = require('passport')
const usersCtrl = {};

usersCtrl.renderSignUpForm = (req,res) => {
    
    res.render('users/signup', {footer: true});
};
usersCtrl.signUp = (req,res) => {

    const errors = [];
    const {nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario, confirmpassword} = req.body;

    if(passwordUsuario != confirmpassword) {
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if(passwordUsuario.length < 4 ){
        errors.push({text:'La contraseña debe tener al menos 4 caracteres'});
    }
    if (errors.length > 0 ) {
        res.render('users/signup', {
            errors, 
            nombreUsuario, 
            apellidoUsuario,  
            emailUsuario});
    }
    else{
        passport.authenticate('local.signup', {
            successRedirect: '/',
            failureRedirect: '/users/signup',
            failureFlash: true
        })(req,res)
    }
};

usersCtrl.renderSignInForm = (req,res) => {
    res.render('users/signin', {footer: true})
};

usersCtrl.signIn = (req,res) => {
    const {email, password} = req.body;
    console.log(req.body)
    if (req.body.email){
        req.session.email = req.body.email

    }
    res.redirect('/')
};

usersCtrl.logOut = (req,res) => {
    req.session.destroy();
    res.redirect('/');
};


module.exports = usersCtrl;