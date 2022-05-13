
const { Schema, model } = require('mongoose');

const PatientSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary']
    },
    email: {
        type: String,
        required: [true, 'The email is necessary'],
        unique: true
    },
    phone: {
        type: String
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    description: { type: String },
});

PatientSchema.methods.toJSON = function () {
    const { _id, ...patient } = this.toObject();
    patient.uid = _id;
    return patient;
}

module.exports = model('Patient', PatientSchema);
