import express from 'express';

const RegisterRoute = express.Router();
const DataDiriRoute = express.Router();
const UploadNilaiRoute = express.Router();
const UploadJadwalMatkul = express.Router();

RegisterRoute.get('/', (req, res) => {
    res.render('Status');
});

DataDiriRoute.get('/', (req, res) => {
    res.render('DataDiri');
});

UploadNilaiRoute.get('/', (req, res) => {
    res.render('UploadNilai');
});

UploadJadwalMatkul.get('/', (req, res) => {
    res.render('Input Mata Kuliah');
});

export {RegisterRoute, DataDiriRoute, UploadNilaiRoute, UploadJadwalMatkul, RegisterRoute as default};