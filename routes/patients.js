const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { postPatient, 
    getPatients} = require('../controllers/patients');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/patients
 */

router.get('/', getPatients);

router.post('/', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('doctor', 'No es un id de Mongo').isMongoId(),
    validarCampos
], postPatient);

module.exports = router;