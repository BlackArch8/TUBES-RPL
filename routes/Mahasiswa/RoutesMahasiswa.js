import express from 'express';


const DashBoardMahasiswaRoute = express.Router();
const JadwalMahasiswaRoute = express.Router();
const SettingMahasiswaRoute = express.Router();

DashBoardMahasiswaRoute.get('/', (req, res) => {
    res.render('Mahasiswa/Dashboard-Mahasiswa');
});

JadwalMahasiswaRoute.get('/', (req, res) => {
    res.render('Mahasiswa/Jadwal-Mahasiswa');
});

SettingMahasiswaRoute.get('/', (req, res) => {
    res.render('Mahasiswa/Setting-Mahasiswa');
});


export {DashBoardMahasiswaRoute, JadwalMahasiswaRoute, SettingMahasiswaRoute, DashBoardMahasiswaRoute as default};