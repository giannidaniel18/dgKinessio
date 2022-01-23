const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database')
const helpers = require('../lib/helpers')






passport.use('local.signin', new LocalStrategy({
    usernameField: 'emailUsuario',
    passwordField: 'passwordUsuario',
    passReqToCallback: true
}, async (req, emailUsuario, passwordUsuario, done) => {
    
    

    const result = await pool.query('SELECT * FROM users WHERE mail_user = ?', [emailUsuario])
    if (result.length > 0) {
        const user = result[0]
        const validPassword = await helpers.matchPassword(passwordUsuario, user.password_user);
        if (validPassword) {
            done(null, user, req.flash('success','Bienvenido' + user.nombre_user));
        }else {
            done(null, false , req.flash ('failure','Contraseña invalida'));
        }
    }else {
        return done (null, false, req.flash('failure','El email ingresado no existe'));
    };
}));




passport.use('local.signup', new LocalStrategy({
    usernameField: 'emailUsuario',
    passwordField: 'passwordUsuario',
    passReqToCallback: true
}, async (req, emailUsuario, passwordUsuario, done) => {
    const {
        nombreUsuario,
        apellidoUsuario
    } = req.body;
    const newUser = {
        nombre_user : nombreUsuario,
        apellido_user : apellidoUsuario,
        mail_user : emailUsuario,
        password_user : passwordUsuario
    };
    newUser.password_user = await helpers.encryptPassword(passwordUsuario);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id_user = result.insertId;
    console.log(newUser);
    return done(null, newUser);
    
}));

passport.serializeUser((user, done) => {
    done(null, user.id_user)
});
passport.deserializeUser( async (id_user, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id_user = ?', [id_user]);
    console.log(rows[0]);
    done(null, rows[0]);
});