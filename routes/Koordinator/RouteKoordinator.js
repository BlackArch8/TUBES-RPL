import express from 'express';
import {db} from '../../database/database.js';

import {app, auth} from '../../index.js';

const KoordinatorRoute = express.Router();

KoordinatorRoute.get('/koordinator/dashboard',auth, (req, res) => {
    const nama = req.session.nama;
    res.render('Koordinator/Dashboard', {nama: nama});
});


KoordinatorRoute.get('/koordinator/penugasan',auth, (req, res) => {
    const query = "SELECT matkul.idmk AS id, idkelas, namamk, requires, nama_dosen FROM matkul INNER JOIN dosen ON matkul.idmk = dosen.idmk inner join kelas on matkul.idmk = kelas.idmk WHERE requires IS NOT NULL;";
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

KoordinatorRoute.get("/get-kelas/:idmk/:idkelas", (req, res) => {
    const id = req.params.idmk;
    const idkelas = req.params.idkelas;
    console.log(idkelas);
    console.log(id);

    const query = "SELECT matkul.idmk, nama_dosen, namamk, hari, awal, akhir from matkul inner join kelas on matkul.idmk = kelas.idmk inner join dosen on dosen.idmk = matkul.idmk WHERE kelas.idmk = ? and kelas.idkelas = ?;";
    db.query(query, [id,idkelas], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);

      res.json(result);
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

//change status
KoordinatorRoute.post("/koordinator/ubahstatus/:status", (req, res) => {
    const status = req.params.status;   

    const query = "UPDATE status SET lowongan = ?;";
    db.query(query, [status], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  });

//info status
KoordinatorRoute.get("/koordinator/infostatus", (req, res) => {
    const query = "SELECT lowongan FROM status;";
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);

      res.json(result);
    });
  });

  //tambah matkul ambil data
  KoordinatorRoute.get("/koordinator/ambilmatkul", (req,res) => {
    const query = ``;

    db.query(query, [], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });


  });

  
  //tambah matkul
  KoordinatorRoute.post("/koordinator/tambahmatkul/:idkm", (req, res) => {
    const idmk = req.body.idmk;
    const namamk = req.body.namamk;
    const sks = req.body.sks;
    const requires = req.body.requires;
    const query = "";
    db.query(query, [idmk, namamk, sks, requires], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  });

  //




export {KoordinatorRoute, KoordinatorRoute as default};