import express from 'express';

const RegisterRoute = express.Router();
const DataDiriRoute = express.Router();
const DataDiriAlumniRoute = express.Router();
const UploadNilaiRoute = express.Router();
const UploadNilaiAlumniRoute = express.Router();
const UploadJadwalMatkul = express.Router();
const UploadJadwalMatkulAlumni = express.Router();



RegisterRoute.get('/', (req, res) => {
    res.render('register/Status');
});

DataDiriRoute.get('/', (req, res) => {
    res.render('register/DataDiri');
});

DataDiriAlumniRoute.get('/', (req, res) => {
    res.render('register/DataDiriAlumni');
});

UploadNilaiRoute.get('/', (req, res) => {
    res.render('register/UploadNilai');
});
UploadNilaiAlumniRoute.get('/', (req, res) => {
    res.render('register/UploadNilaiAlumni');
});

UploadJadwalMatkul.get('/', (req, res) => {
    res.render('register/InputMataKuliah');
});
UploadJadwalMatkulAlumni.get('/', (req, res) => {
    res.render('register/InputAlumni');
});

export {RegisterRoute, DataDiriRoute, DataDiriAlumniRoute, UploadNilaiRoute, UploadNilaiAlumniRoute, UploadJadwalMatkul,UploadJadwalMatkulAlumni , RegisterRoute as default};