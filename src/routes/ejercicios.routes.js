const express = require('express')
var router = express.Router();
const {renderEjercicios, renderEjerciciosform, addEjercicio} = require('../controllers/ejercicios.controller')

router.get('/ejercicios/list', renderEjercicios)
router.get('/ejercicios', renderEjerciciosform)
router.post('/ejercicios/add', addEjercicio)


module.exports = router;
