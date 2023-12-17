import express from 'express';
//import db
import {db} from '../../database/database.js';

const DashBoardDosenRoute = express.Router();
const JadwalDosenRoute = express.Router();
const InputAsistenRoute = express.Router();
const SettingDosenRoute = express.Router();

DashBoardDosenRoute.get('/', (req, res) => {
    res.render('Dosen/Dashboard-Dosen');
});

JadwalDosenRoute.get('/', (req, res) => {
    const query = "SELECT * FROM dosen INNER JOIN kelas ON dosen.idmk = kelas.idmk INNER JOIN matkul on kelas.idmk = matkul.idmk WHERE dosen.nama_dosen = ?;";
    db.query(query, ["Hakim"], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result);
        res.render('Dosen/Jadwal-Dosen', { result: result });
    });
});


InputAsistenRoute.get('/', (req, res) => {
    const query = "SELECT * FROM dosen INNER JOIN kelas ON dosen.idmk = kelas.idmk INNER JOIN matkul on kelas.idmk = matkul.idmk WHERE dosen.nama_dosen = ?;";
    db.query(query, ["Hakim"], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result);
        res.render('Dosen/Input-Asistensi', { result: result });
    });

});

SettingDosenRoute.get('/', (req, res) => {
    res.render('Dosen/Setting-Dosen');
});


export {DashBoardDosenRoute, JadwalDosenRoute, InputAsistenRoute, SettingDosenRoute, DashBoardDosenRoute as default};