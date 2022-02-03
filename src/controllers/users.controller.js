const passport = require("passport");
const pool = require('../database')
const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup", { footer: true });
};
usersCtrl.signUp = (req, res) => {
  const errors = [];
  const {
    nombreUsuario,
    apellidoUsuario,
    emailUsuario,
    passwordUsuario,
    confirmpassword,
  } = req.body;

  if (passwordUsuario != confirmpassword) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (passwordUsuario.length < 4) {
    errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      nombreUsuario,
      apellidoUsuario,
      emailUsuario,
    });
  } else {
    passport.authenticate("local.signup", {
      successRedirect: "/",
      failureRedirect: "/users/signup",
      failureFlash: true,
    })(req, res);
  }
};

usersCtrl.renderSignInForm = (req, res) => {
  res.render("users/signin", { footer: true });
};

usersCtrl.signIn = (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })(req, res, next);
  // const {email, password} = req.body;
  // console.log(req.body)
  // if (req.body.email){
  //     req.session.email = req.body.email

  // }
  // res.redirect('/')
};

usersCtrl.logOut = (req, res) => {
  req.logOut();
  res.redirect("/users/signin");
};
usersCtrl.renderEditProfile = (req, res) => {
  res.render("users/editProfile", { footer: true });
};
usersCtrl.renderProfile = (req, res) => {
  res.render("users/profile", { footer: true });
};
usersCtrl.editProfile = async (req, res) => {
    const {id_user} = req.params;
    const errors = [];
    const {nombreUsuario, apellidoUsuario, emailUsuario, tipoDoc, nroDoc, nroTel , Nacionalidad} = req.body

    // AGREGAR VALIDACIONES PARA QUE NO INGRESE CAMPOS VACIOS
    
    console.log(req.body)
    const updateUser = {
        nombre_user : nombreUsuario, 
        apellido_user :apellidoUsuario, 
        mail_user : emailUsuario, 
        id_tipoDoc : tipoDoc, 
        nro_doc: nroDoc, 
        tel_contacto :nroTel, 
        Nacionalidad : Nacionalidad

    }

    await pool.query('UPDATE users set ? WHERE id_user = ?', [updateUser, id_user]);
    req.flash('success', 'Datos actualizados correctamente')
    res.redirect('/users/profile')


};

module.exports = usersCtrl;
