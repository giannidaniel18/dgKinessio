const express = require('express')
var router = express.Router();
const {isLoggedIn} = require('../lib/auth')
const {renderEjercicios, renderEjerciciosform, addEjercicio, deleteEjercicio, editEjercicio, updateEjercicio} = require('../controllers/ejercicios.controller')

router.get('/ejercicios', isLoggedIn ,renderEjercicios)
router.get('/ejercicios/create',isLoggedIn , renderEjerciciosform)
router.post('/ejercicios/add',isLoggedIn ,addEjercicio)
router.get('/ejercicios/delete/:id_ejercicio',isLoggedIn , deleteEjercicio)
router.get('/ejercicios/edit/:id_ejercicio',isLoggedIn, editEjercicio)
router.post('/ejercicios/edit/:id_ejercicio', isLoggedIn,  updateEjercicio)

module.exports = router;
