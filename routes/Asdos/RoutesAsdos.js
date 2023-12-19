import express from 'express';
//import db
import {db} from '../../database/database.js';

import {app, auth} from '../../index.js';

const DashBoardAsdosRoute = express.Router();
const JadwalAsdosRoute = express.Router();
const SettingAsdosRoute = express.Router();

DashBoardAsdosRoute.get('/',auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Asdos/DashboardAsdos', {nama: nama});
});

JadwalAsdosRoute.get('/',auth, (req, res) => {
    const query = "SELECT m.namamk, m.idmk, k.hari, k.awal, k.akhir, k.idkelas, k.ruangkelas FROM calon AS c INNER JOIN assigned AS a ON c.id_calon = a.id_calon INNER JOIN matkul AS m ON a.idmk = m.idmk INNER JOIN kelas AS k ON m.idmk = k.idmk WHERE a.id_calon = '6182001001' AND k.idkelas = a.idkelas;";
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result);
        const nama = req.session.nama;
        res.render('Asdos/JadwalAsdos', { result: result, nama: nama });
    });
});

SettingAsdosRoute.get('/',auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Asdos/SettingAsdos', {nama: nama});
});


export {DashBoardAsdosRoute, JadwalAsdosRoute, SettingAsdosRoute, DashBoardAsdosRoute as default};