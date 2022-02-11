const pool = require("../database");

const adminCtrl = {};


adminCtrl.renderAdministrator = (req, res) => {
  

    res.render("admin/administrator", {
        isAdmin : true,
      });
};

adminCtrl.renderProfileUsers = async (req, res) => {
  const currentUser = req.user
  
  if(currentUser.perfil == "admin"){
    const users = await pool.query("SELECT * FROM users")
    res.render("admin/abmPerfiles", {
      isAdmin : true,
      users
    });
  } else {
    req.flash("failure", "No tiene los permisos necesarios para realizar esta operación.");
    req.logOut();
    res.redirect("/users/signin");
  }
  
};

adminCtrl.updateProfile = async (req, res) => {
  const {id_user} = req.params
  const {perfil} = req.body
  const currentUser = req.user
  const userToUpdate = {
    perfil : perfil
  };


  if(currentUser.perfil === 'admin'){
    if (currentUser.id_user == id_user) {
    req.flash("warning", "Por cuestiones de seguridad no es posible modificar tu propios accesos, por favor ponete en contacto con un administrador");
    res.redirect("/admin/abmPerfiles");
    } else {
      await pool.query("UPDATE users set ? WHERE id_user = ?", [
        userToUpdate,
        id_user,
      ]);
      console.log(currentUser.perfil)
      req.flash("success", "Perfil del usuario modificado satisfactoriamente");
      res.redirect("/admin/abmPerfiles");
    }    
  }else{
    req.flash("failure", "No tiene los permisos necesarios para realizar esta operación.");
    req.logOut();
    res.redirect("/users/signin");
  }
  
}



module.exports = adminCtrl;