const {Router} = require('express');
const {check}  = require('express-validator');
const router = Router();


//Funciones
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const validName =  check('name', 'El nombre es obligatorio').not().isEmpty()
const validEmail = check('email', 'El email es obligatorio').isEmail()
const validPassword = check('password', 'El password debe de contener minimo 6 caracteres').isLength({min: 6})


router.post(
    '/new',
     [//*Middleware
        validName,
        validEmail,
        validPassword,
        validarCampos
     ] ,
     crearUsuario
);

router.post(
    '/',
     [//*Middleware
        validEmail,
        validPassword,
        validarCampos

     ],
     loginUsuario
);

router.get('/renew',validarJWT, revalidarToken);

 //module.exports es la manera de exportar en Node
 module.exports = router;