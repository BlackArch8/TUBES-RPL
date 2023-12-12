import express from 'express';

const RegisterRoute = express.Router();
const DataDiriRoute = express.Router();
const DataDiriAlumniRoute = express.Router();
const UploadNilaiRoute = express.Router();
const UploadNilaiAlumniRoute = express.Router();
const UploadJadwalMatkul = express.Router();
const UploadJadwalMatkulAlumni = express.Router();



RegisterRoute.get('/', (req, res) => {
    res.render('Status');
});

DataDiriRoute.get('/', (req, res) => {
    res.render('DataDiri');
});

DataDiriAlumniRoute.get('/', (req, res) => {
    res.render('DataDiriAlumni');
});

UploadNilaiRoute.get('/', (req, res) => {
    res.render('UploadNilai');
});
UploadNilaiAlumniRoute.get('/', (req, res) => {
    res.render('UploadNilaiAlumni');
});

UploadJadwalMatkul.get('/', (req, res) => {
    res.render('Input Mata Kuliah');
});
UploadJadwalMatkulAlumni.get('/', (req, res) => {
    res.render('Input Alumni');
});

export {RegisterRoute, DataDiriRoute, DataDiriAlumniRoute, UploadNilaiRoute, UploadNilaiAlumniRoute, UploadJadwalMatkul,UploadJadwalMatkulAlumni , RegisterRoute as default};