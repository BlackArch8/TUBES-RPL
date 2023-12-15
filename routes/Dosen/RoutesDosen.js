import express from 'express';


const DashBoardDosenRoute = express.Router();
const JadwalDosenRoute = express.Router();
const InputAsistenRoute = express.Router();
const SettingDosenRoute = express.Router();

DashBoardDosenRoute.get('/', (req, res) => {
    res.render('Dosen/Dashboard-Dosen');
});

JadwalDosenRoute.get('/', (req, res) => {
    res.render('Dosen/Jadwal-Dosen');
});

InputAsistenRoute.get('/', (req, res) => {
    res.render('Dosen/Input-Asistensi');
});

SettingDosenRoute.get('/', (req, res) => {
    res.render('Dosen/Setting-Dosen');
});


export {DashBoardDosenRoute, JadwalDosenRoute, InputAsistenRoute, SettingDosenRoute, DashBoardDosenRoute as default};