const pool = require('../database')
const ejerciciosCtrl = {};

ejerciciosCtrl.renderEjercicios = async (req,res) => {
    var logueado = Boolean(req.session.email)
    const ejercicios = await pool.query('SELECT * FROM ejercicios')
     

    res.render('ejercicios/list', {
        isEjercicios : true,
        logueado : logueado,
        email: req.session.email,
        ejercicios

    });
}
ejerciciosCtrl.addEjercicio = async (req,res) => {
    var logueado = Boolean(req.session.email)
    const {nombre_ejercicio, zona_anatomica, nivel, descripcion, link_video , contraindicaciones} = req.body
    console.log(req.body)
    const newEjercicio = {
        nombre_ejercicio,
        zona_anatomica,
        descripcion,
        link_video,
        contraindicaciones,
        nivel
    };

    await pool.query('INSERT INTO ejercicios set ?', [newEjercicio])

    res.redirect('list')
}

ejerciciosCtrl.renderEjerciciosform = (req,res) => {
    var logueado = Boolean(req.session.email)
    res.render('ejercicios/form', {
        isEjercicios : true,
        logueado : logueado,
        email: req.session.email
    });
}

module.exports = ejerciciosCtrl;