import express from 'express';


const DashBoardAsdosRoute = express.Router();
const JadwalAsdosRoute = express.Router();
const SettingAsdosRoute = express.Router();

DashBoardAsdosRoute.get('/', (req, res) => {
    res.render('Asdos/DashboardAsdos');
});

JadwalAsdosRoute.get('/', (req, res) => {
    res.render('Asdos/JadwalAsdos');
});

SettingAsdosRoute.get('/', (req, res) => {
    res.render('Asdos/SettingAsdos');
});


export {DashBoardAsdosRoute, JadwalAsdosRoute, SettingAsdosRoute, DashBoardAsdosRoute as default};