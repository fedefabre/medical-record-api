const { response, request } = require('express');
const Patient = require('../models/patient');

const getPatients = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    const [total, patients] = await Promise.all([
        Patient.countDocuments(query),
        Patient.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('doctor', 'nombre')
    ]);

    res.json({
        total,
        patients
    });
}

const postPatient = async (req, res = response) => {

    // TODO: Abstract to a function
    const patientDB = await Patient.findOne({ email: req.body.email });

    if (patientDB) {
        return res.status(400).json({
            msg: `A patient already exists with that e-mail`
        });
    }
    //

    const patient = new Patient(req.body);
    const newPatient = await patient.save();
    await newPatient.populate('doctor', 'nombre').execPopulate();

    res.status(201).json(newPatient);
}

// const patientsPut = async (req, res = response) => {

//     const { id } = req.params;
//     const { _id, password, google, correo, ...resto } = req.body;

//     if (password) {
//         // Encriptar la contraseña
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync(password, salt);
//     }

//     const usuario = await Patient.findByIdAndUpdate(id, resto);

//     res.json(usuario);
// }

// const patientsPatch = (req, res = response) => {
//     res.json({
//         msg: 'patch API - usuariosPatch'
//     });
// }

// const patientsDelete = async (req, res = response) => {

//     const { id } = req.params;
//     const usuario = await Patient.findByIdAndUpdate(id, { estado: false });


//     res.json(usuario);
// }




module.exports = {
    getPatients,
    postPatient
}