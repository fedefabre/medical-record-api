const Patient = require('../models/patient');

const isUnique = (email) => {
  return Patient.findOne({ email: email });
}

module.exports = {
  isUnique
}