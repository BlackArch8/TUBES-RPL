import express from 'express';


const DashBoardRoute = express.Router();
const PenugasanRoute = express.Router();
const SeleksiRoute = express.Router();
const ListAsdosRoute = express.Router();
const JadwalRoute = express.Router();
const TambahMatkulRoute = express.Router();
const SettingRoute = express.Router();

DashBoardRoute.get('/', (req, res) => {
    res.render('Koordinator/Dashboard');
});

PenugasanRoute.get('/', (req, res) => {
    res.render('Koordinator/Penugasan');
});


SeleksiRoute.get('/', (req, res) => {
    res.render('Koordinator/Seleksi');
});

ListAsdosRoute.get('/', (req, res) => {
    res.render('Koordinator/ListAsdos');
});

JadwalRoute.get('/', (req, res) => {
    res.render('Koordinator/Jadwal');
});

TambahMatkulRoute.get('/', (req, res) => {
    res.render('Koordinator/TambahMatkul');
});

SettingRoute.get('/', (req, res) => {
    res.render('Koordinator/Setting');
});


export {DashBoardRoute, PenugasanRoute, SeleksiRoute, ListAsdosRoute, JadwalRoute, TambahMatkulRoute, SettingRoute, DashBoardRoute as default};