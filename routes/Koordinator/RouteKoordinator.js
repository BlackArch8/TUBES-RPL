import express from 'express';
import {db} from '../../database/database.js';


const DashBoardRoute = express.Router();
const PenugasanRoute = express.Router();
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

ListAsdosRoute.get('/', (req, res) => {
    const query = "SELECT DISTINCT nama_calon, email, alumni from assigned INNER JOIN calon ON calon.id_calon = assigned.id_calon;";
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result);
        res.render('Koordinator/ListAsdos', { result: result });
    });
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


export {DashBoardRoute, PenugasanRoute, ListAsdosRoute, JadwalRoute, TambahMatkulRoute, SettingRoute, DashBoardRoute as default};