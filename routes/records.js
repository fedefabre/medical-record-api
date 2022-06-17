const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { postRecord, getRecords, getRecordsByPatientId} = require('../controllers/records');
const { doesPatientExistById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/records
 */

router.get('/', getRecords);

router.get('/:patientId', [
    check('patientId', 'It is not a valid Mongo ID').isMongoId(),
    check('patientId').custom( doesPatientExistById ),
    validarCampos,
], getRecordsByPatientId);

router.post('/', [
    validarJWT,
    check('record', 'The new record is required').not().isEmpty(),
    check('patient', 'The patient is required').not().isEmpty(),
    validarCampos
], postRecord);

module.exports = router;