
const usersCtrl = {};

usersCtrl.renderSignUpForm = (req,res) => {
    res.render('users/signup');
};
usersCtrl.signUp = (req,res) => {

    const errors = [];
    const {nombre, apellido, dni, tel, email, password, confirmpassword} = req.body;

    if(password != confirmpassword) {
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if(password.length < 4 ){
        errors.push({text:'La contraseña debe tener al menos 4 caracteres'});
    }
    if (errors.length > 0 ) {
        res.render('users/signup', {
            errors, 
            nombre, 
            apellido, 
            dni, 
            tel, 
            email});
    }
    else{
        res.send('REGISTRADO')
    }
};

usersCtrl.renderSignInForm = (req,res) => {
    res.render('users/signin')
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