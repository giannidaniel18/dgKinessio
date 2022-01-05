var express = require('express');
var router = express.Router();
const {renderIndex , renderContacto ,renderNosotros , renderServicios } = require ('../controllers/index.controller')
 

router.get('/', renderIndex);
router.get('/contactos', renderContacto);
router.get('/nosotros', renderNosotros);
router.get('/servicios', renderServicios);


module.exports = router;