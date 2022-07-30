
/*
Event Routes
/api/events
*/

const {Router} = require("express");
const {check} = require('express-validator');

const {isDate} = require('../helpers/isDate');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');

const router = Router();

//*Validaciones
const validTitle = check('title', 'El titulo es obligatorio').not().isEmpty()
const validDate = check('start', 'Fecha de inicio es obligatoria').custom( isDate )
const validEndDate = check('end', 'Fecha de finalización es obligatoria').custom( isDate )
 

//*Todas tienen que pasar por la validación del JWT
router.use( validarJWT);



//*Obtener eventos
router.get('/', getEventos);


//*Crear un nuevo evento
router.post(
    '/',
    [
        validTitle,
        validDate,
        validEndDate,
        validarCampos

    ],
     crearEvento);


//*Actualizar Evento
router.put('/:id', actualizarEvento);


//*Borrar evento
router.delete('/:id', eliminarEvento)


module.exports = router;