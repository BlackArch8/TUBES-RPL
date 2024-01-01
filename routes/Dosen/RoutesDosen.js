import express from 'express';
//import db
import {db} from '../../database/database.js';

import {app, auth} from '../../index.js';

const DosenRoute = express.Router();



DosenRoute.get('/dosen/dashboard-dosen', auth(['dosen']), (req, res) => {
    const nama = req.session.nama;
    res.render('Dosen/Dashboard-Dosen', {nama: nama});
});

DosenRoute.get('/dosen/jadwal-dosen', auth(['dosen']), (req, res) => {
    const query = "SELECT * FROM dosen INNER JOIN kelas ON dosen.idmk = kelas.idmk INNER JOIN matkul on kelas.idmk = matkul.idmk WHERE dosen.nama_dosen = ?;";
    const query2 = "SELECT a.idmk, k.idkelas, k.hari, c.nama_calon, k.awal,k.akhir FROM dosen AS d  INNER JOIN kelas AS k ON d.idmk = k.idmk  INNER JOIN matkul AS m on k.idmk = m.idmk  INNER JOIN assigned AS a ON a.idkelas = k.idkelas INNER JOIN calon AS c ON a.id_calon = c.id_calon WHERE d.nama_dosen = ?;";
    db.query(query, [req.session.nama], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        db.query(query2, [req.session.nama], (err, result2) => {
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


DosenRoute.get('/dosen/input-asisten',auth(['dosen']), (req, res) => {
    const query = "SELECT matkul.idmk, namamk, idkelas, requires FROM matkul INNER JOIN dosen ON matkul.idmk = dosen.idmk INNER JOIN kelas ON matkul.idmk = kelas.idmk WHERE dosen.id_dosen = ?;";
    db.query(query, [req.session.npm], (err, result) => {
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

DosenRoute.get('/dosen/setting-dosen',auth(['dosen']), (req, res) => {
    const nama = req.session.nama;
    res.render('Dosen/Setting-Dosen', {nama: nama});
});
//get data from database to client side using ajax
DosenRoute.get("/get-data/:idmk/:idkelas",auth(['dosen']), (req, res) => {
    const id = req.params.idmk;
    const idkelas = req.params.idkelas;
    const query = "SELECT requires FROM matkul inner join kelas on matkul.idmk = kelas.idmk WHERE kelas.idmk = ? and kelas.idkelas = ?";
    db.query(query, [id,idkelas], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.json(result);
    });
  });
  
  //update data to database
  DosenRoute.post("/update-data/:idmk/:requires/:idkelas",auth(['dosen']), (req, res) => {
    const id = req.params.idmk;
    const requires = req.params.requires;
    const kelas = req.params.idkelas;
    const query = "UPDATE kelas SET requires = ? WHERE idmk = ? and idkelas = ?";
    db.query(query, [requires, id, kelas], (err) => {
      if (err) {
        console.log(err);
      }
      console.log("data berhasil diupdate");
      
      
    });
  });

  


export {DosenRoute, DosenRoute as default};