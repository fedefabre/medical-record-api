const { Schema, model } = require('mongoose');

const RecordSchema = Schema({
    record: {
        type: String,
        required: [true, 'The new record is required']
    },
    img: { type: String },
    creationDate: { type: Date, default: Date.now },
    modificationDate: { type: Date, default: Date.now },
    file: { type: String },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: [true, 'The patient is required'] },
});


RecordSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Record', RecordSchema );
