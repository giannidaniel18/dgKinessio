const pool = require("../database");
const ejerciciosCtrl = {};
const {helpers} = require('../lib/helpers')

ejerciciosCtrl.renderEjercicios = async (req, res) => {
  const ejercicios = await pool.query(
    "SELECT * FROM ejercicios order by id_ejercicio asc"
  );
  res.render("ejercicios/list", {
    isEjercicios: true,
    ejercicios,
    footer: false,
  });
};
ejerciciosCtrl.addEjercicio = async (req, res) => {
  let {
    nombre_ejercicio,
    zona_anatomica,
    nivel,
    descripcion,
    link_video,
    contraindicaciones,
  } = req.body;

  link_video = helpers.embebedLink(link_video)

  const newEjercicio = {
    nombre_ejercicio,
    zona_anatomica,
    descripcion,
    link_video,
    contraindicaciones,
    nivel,
  };

  await pool.query("INSERT INTO ejercicios set ?", [newEjercicio]);
  req.flash("success", "Ejercicio agregado satisfactoriamente");
  res.redirect("/ejercicios");
};
ejerciciosCtrl.deleteEjercicio = async (req, res) => {
  const { id_ejercicio } = req.params;
  await pool.query("DELETE FROM ejercicios WHERE id_ejercicio = ?", [
    id_ejercicio,
  ]);
  req.flash("success", "Ejercicio Eliminado satisfactoriamente");
  res.redirect("/ejercicios");
};
ejerciciosCtrl.editEjercicio = async (req, res) => {
  const { id_ejercicio } = req.params;

  const ejercicio = await pool.query(
    "SELECT * FROM ejercicios WHERE id_ejercicio = ?",
    [id_ejercicio]
  );
  res.render("ejercicios/edit", {
    ejercicio: ejercicio[0],
    isEjercicios: true,
  });
};
ejerciciosCtrl.updateEjercicio = async (req, res) => {
  const { id_ejercicio } = req.params;
  let {
    nombre_ejercicio,
    zona_anatomica,
    nivel,
    descripcion,
    link_video,
    contraindicaciones,
  } = req.body;
  link_video = helpers.embebedLink(link_video)
  const updatedEjercicio = {
    nombre_ejercicio,
    zona_anatomica,
    nivel,
    descripcion,
    link_video,
    contraindicaciones,
  };
  console.log(updatedEjercicio);
  await pool.query("UPDATE ejercicios set ? WHERE id_ejercicio = ?", [
    updatedEjercicio,
    id_ejercicio,
  ]);
  req.flash("success", "Ejercicio Modificado satisfactoriamente");
  res.redirect("/ejercicios");
};
ejerciciosCtrl.renderEjerciciosform = (req, res) => {
  res.render("ejercicios/add", {
    isEjercicios: true,
    footer: false,
  });
};
ejerciciosCtrl.searchEjercicio= async (req, res) => {
  let searchterm = req.body.search;
  const ejercicios = await pool.query(
    "SELECT * FROM ejercicios where nombre_ejercicio LIKE ? ", ['%' + searchterm + '%']
  );
  console.log(searchterm);
  res.render("ejercicios/list", {
    isEjercicios: true,
    ejercicios,
    searchterm,
    footer: false,
  });
}


module.exports = ejerciciosCtrl;
