const express = require('express')
var router = express.Router();
const {renderEjercicios, renderEjerciciosform, addEjercicio, deleteEjercicio, editEjercicio, updateEjercicio} = require('../controllers/ejercicios.controller')

router.get('/ejercicios', renderEjercicios)
router.get('/ejercicios/create', renderEjerciciosform)
router.post('/ejercicios/add', addEjercicio)
router.get('/ejercicios/delete/:id_ejercicio', deleteEjercicio)
router.get('/ejercicios/edit/:id_ejercicio', editEjercicio)
router.post('/ejercicios/edit/:id_ejercicio', updateEjercicio)



module.exports = router;
