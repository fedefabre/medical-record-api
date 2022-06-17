const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { postPatient, 
    getPatients, getPatient} = require('../controllers/patients');

const { doesPatientExistById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/patients
 */

router.get('/', getPatients);

router.get('/:id', [
    check('id', 'It is not a valid Mongo ID').isMongoId(),
    check('id').custom( doesPatientExistById ),
    validarCampos,
], getPatient);

router.post('/', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('doctor', 'No es un id de Mongo').isMongoId(),
    validarCampos
], postPatient);

module.exports = router;