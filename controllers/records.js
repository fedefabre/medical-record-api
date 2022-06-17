const { response, request } = require('express');
const Record = require('../models/record');
const ObjectId = require('mongodb').ObjectID;


const getRecords = async (req = request, res = response) => {

  const { limit = 100, from = 0 } = req.query;
  const query = {};

  const [total, records] = await Promise.all([
    Record.countDocuments(query),
    Record.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('patient', 'name')
  ]);

  res.json({
    total,
    records
  });
}

const getRecordsByPatientId = async (req, res = response) => {

  const { patientId } = req.params;
  const record = await Record.find({ patient: ObjectId(patientId) })
    .populate('patient', 'name');

  res.json(record);

}

const postRecord = async (req, res = response) => {

  const record = new Record(req.body);
  const newRecord = await record.save();
  await newRecord.populate('patient', 'name').execPopulate();

  res.status(201).json(newRecord);
}

module.exports = {
  getRecords,
  getRecordsByPatientId,
  postRecord
}