import express from 'express';
//import db
import {db} from '../../database/database.js';

//import session and auth
import {app, auth} from '../../index.js';

const DashBoardDosenRoute = express.Router();
const JadwalDosenRoute = express.Router();
const InputAsistenRoute = express.Router();
const SettingDosenRoute = express.Router();

DashBoardDosenRoute.get('/', auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Dosen/Dashboard-Dosen', {nama: nama});
});

JadwalDosenRoute.get('/', auth, (req, res) => {
    const query = "SELECT * FROM dosen INNER JOIN kelas ON dosen.idmk = kelas.idmk INNER JOIN matkul on kelas.idmk = matkul.idmk WHERE dosen.nama_dosen = ?;";
    const query2 = "SELECT a.idmk, k.idkelas, k.hari, c.nama_calon, k.awal,k.akhir FROM dosen AS d  INNER JOIN kelas AS k ON d.idmk = k.idmk  INNER JOIN matkul AS m on k.idmk = m.idmk  INNER JOIN assigned AS a ON a.idkelas = k.idkelas INNER JOIN calon AS c ON a.id_calon = c.id_calon WHERE d.nama_dosen = ?;";
    db.query(query, ["Pascal"], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        db.query(query2, ["Pascal"], (err, result2) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log(result2);
            const nama = req.session.nama;
            res.render('Dosen/Jadwal-Dosen', { result: result, resultasisten: result2, nama: nama });
        });

        
    });
});


InputAsistenRoute.get('/',auth, (req, res) => {
    const query = "SELECT * FROM matkul INNER JOIN dosen ON matkul.idmk = dosen.idmk WHERE dosen.id_dosen = ?;";
    db.query(query, ["1231231232"], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result);
        const nama = req.session.nama;
        res.render('Dosen/Input-Asistensi', { result: result, nama: nama });
    });

});

SettingDosenRoute.get('/',auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Dosen/Setting-Dosen', {nama: nama});
});


export {DashBoardDosenRoute, JadwalDosenRoute, InputAsistenRoute, SettingDosenRoute, DashBoardDosenRoute as default};