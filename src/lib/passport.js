const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database')
const helpers = require('../lib/helpers')


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
    done(null, user.id_user )
});
passport.deserializeUser( async (id_user, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id_user = ?', [id_user]);
    console.log(rows[0]);
    done(null, rows[0]);
    
});