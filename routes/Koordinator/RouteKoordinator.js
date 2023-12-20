import express from 'express';
import {db} from '../../database/database.js';

import {app, auth} from '../../index.js';

const KoordinatorRoute = express.Router();

KoordinatorRoute.get('/koordinator/dashboard',auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Koordinator/Dashboard', {nama: nama});
});


KoordinatorRoute.get('/koordinator/penugasan',auth, (req, res) => {
    const query = "SELECT matkul.idmk AS id, namamk, requires, nama_dosen FROM matkul INNER JOIN dosen ON matkul.idmk = dosen.idmk WHERE requires IS NOT NULL;";
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result);
        const nama = req.session.nama;
        res.render('Koordinator/Penugasan', { result: result , nama: nama});
    });
});

KoordinatorRoute.get('/koordinator/list-asdos', auth, (req, res) => {
    const query = "SELECT DISTINCT nama_calon, email, alumni, assigned.id_calon as assigned FROM calon left outer JOIN assigned ON calon.id_calon = assigned.id_calon;";
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log(result);
        const nama = req.session.nama;
        res.render('Koordinator/ListAsdos', { result: result, nama: nama });
    });
});

KoordinatorRoute.get('/koordinator/jadwal', auth, (req, res) => {
    const query = "SELECT * FROM dosen INNER JOIN kelas ON dosen.idmk = kelas.idmk INNER JOIN matkul on kelas.idmk = matkul.idmk;";
    const query2 = "SELECT a.idmk, k.idkelas, k.hari, c.nama_calon, k.awal,k.akhir FROM dosen AS d  INNER JOIN kelas AS k ON d.idmk = k.idmk  INNER JOIN matkul AS m on k.idmk = m.idmk  INNER JOIN assigned AS a ON a.idkelas = k.idkelas INNER JOIN calon AS c ON a.id_calon = c.id_calon;";
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        db.query(query2, (err, result2) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log(result2);
            const nama = req.session.nama;
            res.render('Koordinator/Jadwal', { result: result, resultasisten: result2, nama: nama });
        });

        
    });
});

KoordinatorRoute.get('/koordinator/tambah-matkul',auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Koordinator/TambahMatkul', {nama: nama});
});

KoordinatorRoute.get('/koordinator/setting',auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Koordinator/Setting', {nama: nama});
});


export {KoordinatorRoute, KoordinatorRoute as default};