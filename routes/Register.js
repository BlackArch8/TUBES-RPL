import express from 'express';

const RegisterRoute = express.Router();
const DataDiriRoute = express.Router();
const UploadNilaiRoute = express.Router();

RegisterRoute.get('/', (req, res) => {
    res.render('Status');
});

DataDiriRoute.get('/', (req, res) => {
    res.render('DataDiri');
});

UploadNilaiRoute.get('/', (req, res) => {
    res.render('Upload Nilai');
});




export {RegisterRoute, DataDiriRoute, UploadNilaiRoute, RegisterRoute as default};