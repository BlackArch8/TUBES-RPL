import express from "express";
import nodemailer from "nodemailer";
import generatepassword from "generate-password";
import { db } from "../../database/database.js";

import { app, auth } from "../../index.js";

const KoordinatorRoute = express.Router();

KoordinatorRoute.get("/koordinator/dashboard", auth(['koordinator']), (req, res) => {
  const nama = req.session.nama;
  res.render("Koordinator/Dashboard", { nama: nama });
});

//ambil data matkul penugasan
KoordinatorRoute.get("/koordinator/penugasan", auth(['koordinator']), (req, res) => {
  const query =
    "SELECT matkul.idmk AS id, idkelas, namamk, requires, nama_dosen FROM matkul INNER JOIN dosen ON matkul.idmk = dosen.idmk inner join kelas on matkul.idmk = kelas.idmk WHERE requires IS NOT NULL AND requires > 0;";
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const nama = req.session.nama;
    res.render("Koordinator/Penugasan", { result: result, nama: nama });
  });
});

//ambil data list asdos
KoordinatorRoute.get("/koordinator/list-asdos", auth(['koordinator']), (req, res) => {
  const query =
    "SELECT DISTINCT nama_calon, email, alumni, assigned.id_calon as assigned FROM calon left outer JOIN assigned ON calon.id_calon = assigned.id_calon;";
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log(result);
    const nama = req.session.nama;
    res.render("Koordinator/ListAsdos", { result: result, nama: nama });
  });
});

//ambil data jadwal asistensi
KoordinatorRoute.get("/koordinator/jadwal", auth(['koordinator']), (req, res) => {
  const query =
    "SELECT * FROM dosen INNER JOIN kelas ON dosen.idmk = kelas.idmk INNER JOIN matkul on kelas.idmk = matkul.idmk;";
  const query2 =
    "SELECT a.idmk, k.idkelas, k.hari, c.nama_calon, k.awal,k.akhir FROM dosen AS d  INNER JOIN kelas AS k ON d.idmk = k.idmk  INNER JOIN matkul AS m on k.idmk = m.idmk  INNER JOIN assigned AS a ON a.idkelas = k.idkelas INNER JOIN calon AS c ON a.id_calon = c.id_calon;";
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    db.query(query2, (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log(result2);
      const nama = req.session.nama;
      res.render("Koordinator/Jadwal", {
        result: result,
        resultasisten: result2,
        nama: nama,
      });
    });
  });
});

//ambil data kelas
KoordinatorRoute.get("/koordinator/get-kelas/:idmk/:idkelas", auth(['koordinator']), (req, res) => {
  const id = req.params.idmk;
  const idkelas = req.params.idkelas;
  console.log(idkelas);
  console.log(id);

  const query =
    "SELECT matkul.idmk, nama_dosen, namamk, hari, awal, akhir,idkelas from matkul inner join kelas on matkul.idmk = kelas.idmk inner join dosen on dosen.idmk = matkul.idmk WHERE kelas.idmk = ? and kelas.idkelas = ?;";
  db.query(query, [id, idkelas], (err, result) => {
    if (err) {
      console.log(err);
    }

    res.json(result);
  });
});

KoordinatorRoute.get("/koordinator/tambah-matkul", auth(['koordinator']), (req, res) => {
  const nama = req.session.nama;
  res.render("Koordinator/TambahMatkul", { nama: nama });
});


//change status
KoordinatorRoute.post("/koordinator/ubahstatus/:status", auth(['koordinator']), (req, res) => {
  const status = req.params.status;

  const query = "UPDATE status SET lowongan = ?;";
  db.query(query, [status], (err, result) => {
    if (err) {
      console.log(err);

    }
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
KoordinatorRoute.get("/koordinator/ambilmatkul",auth(['koordinator']), (req, res) => {
  const query = `SELECT dosen.idmk AS "Kode", namamk AS "Matkul", nama_dosen as "Dosen", hari AS "Hari", idkelas AS "Kelas", awal, akhir, ruangkelas FROM dosen INNER JOIN kelas ON dosen.idmk = kelas.idmk INNER JOIN matkul on kelas.idmk = matkul.idmk;`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

//tambah matkul
KoordinatorRoute.post("/koordinator/tambahmatkul/",auth(['koordinator']), (req, res) => {
  const matkul = req.body.matkul;
  const kodematkul = req.body.kodematkul;
  const hari = req.body.hari;
  const dosen = req.body.dosen;
  const kelas = req.body.kelas;
  const awal = req.body.jamawal;
  const akhir = req.body.jamakhir;
  const ruang = req.body.ruang;

  const checkdos = "SELECT * FROM dosen WHERE idmk = ?;";
  const checkmat = "SELECT * FROM matkul WHERE idmk = ?;";
  const checkkelas = "SELECT * FROM kelas WHERE idmk = ? AND idkelas = ?;";
  const querymatkul = "INSERT INTO matkul (`idmk`, `namamk`) VALUES (?,?);";
  const querykelas =
    "INSERT INTO kelas (`idkelas`,`hari`,`awal`,`akhir`,`idmk`,`ruangkelas`) VALUES (?,?,?,?,?,?);";
  const querydosen =
    "SELECT DISTINCT id_dosen, nama_dosen, pw FROM dosen WHERE nama_dosen = ?;";
  const querydoseninput =
    "INSERT INTO dosen (`id_dosen`,`nama_dosen`,`idmk`,`pw`) VALUES (?,?,?,?);";

  db.query(checkdos, [kodematkul], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length === 0) {
      db.query(querydosen, [dosen], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("Query dosen berhasil");
        console.log(result);
        if (result.length > 0) {
          db.query(
            querydoseninput,
            [result[0].id_dosen, dosen, kodematkul, result[0].pw],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log("Input dosen berhasil");
              //res.status(200).send("ok");
            }
          );
        }
      });
    }
  });
  db.query(checkmat, [kodematkul], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length === 0) {
      db.query(querymatkul, [kodematkul, matkul], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("Input matkul berhasil");
      });
    }
  });
  db.query(checkkelas, [kodematkul,kelas], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length === 0) {
      db.query(
        querykelas,
        [kelas, hari, awal, akhir, kodematkul, ruang],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("Input kelas berhasil");
          res.status(200).send("ok");
        }
      );
    }
    else{
      console.log("kelas sudah ada"); 
      res.status(409).send("kelas sudah ada");
    }
  });
});

//route hapus matkul
KoordinatorRoute.post("/koordinator/hapusmatkul/:kode/:kelas",auth(['koordinator']), (req, res) => {
  const kode = req.params.kode;
  const kelas = req.params.kelas;

  const query = "delete from kelas where idkelas = ? and idmk = ?;";
  db.query(query, [kelas, kode], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("behasil");
    console.log(result);
    res.status(200).send("ok");
  });
});

//ambil nama-nama dosen'
KoordinatorRoute.get("/koordinator/ambildosen", auth(['koordinator']), (req, res) => {
  const query = "SELECT DISTINCT nama_dosen FROM `dosen`;";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);

    res.json(result);
  });
});

//ambil nama-nama asdos yang ingin di assign
KoordinatorRoute.get("/koordinator/get-list-asdos-asign/:idmk", auth(['koordinator']), (req, res) => {
  const idmk = req.params.idmk;
  const query = `SELECT nama_calon,nilai, calon.id_calon from nilai INNER JOIN calon ON calon.id_calon = nilai.id_calon WHERE nilai < "B-" AND idmk = ? AND jumlah_matkul > 0;`;
  db.query(query, [idmk], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);

    res.json(result);
  });
});

//asiign asdos
KoordinatorRoute.post("/koordinator/assign-asdos/", auth(['koordinator']), (req, res) => {
  const idmk = req.body.idmk;
  const idkelas = req.body.idkelas;
  const hari = req.body.hari;
  const awal = req.body.awal;
  const akhir = req.body.akhir;
  const calon = req.body.calon;

  const query_cek = `SELECT * from nilai INNER JOIN calon 
     ON calon.id_calon = nilai.id_calon inner join
     jadwal on jadwal.id_calon = calon.id_calon 
     WHERE nilai<"B-" AND idmk = ? AND hari = ? 
     AND (awal <= ? AND akhir >= ?) AND jumlah_matkul > 0;`;

  const query_assign_calon =
    "INSERT INTO assigned (`id_calon`,`idmk`,`idkelas`) VALUES (?,?,?);";
  const query_update_calon =
    "UPDATE calon SET jumlah_matkul = jumlah_matkul - 1 WHERE id_calon = ?;";
  const query_update_kelas =
    "update kelas set requires = requires - 1 where idmk = ? and idkelas = ?;";
  const query_update_jadwal =
    `delete from jadwal where hari = ? and awal = ? and akhir = ? and id_calon = ?;`;

  db.query(query_cek, [idmk, hari, awal, akhir], (err, result_cek) => {
    if (err) {
      console.log(err);
    }
    console.log("result cek");
    console.log(result_cek);
    if (result_cek.length > 0) {
      //cek apakah calon sudah di assign / ada yang bentrok
      let bentrok = [];
      for (let i = 0; i < calon.length; i++) {
        let cek = false;
        //cek apakah id_calon terdapat di result_cek
        for (let j = 0; j < result_cek.length; j++) {
          if (calon[i] == result_cek[j].id_calon) {
            cek = true;
            continue;
          }
        }
        if (cek == false) {
          bentrok.push(calon[i]);
        }
      }

      if (bentrok.length > 0) {
        //kirim bentrok ke client dan status failed
        res.status(409).send(bentrok);

        console.log("BENTROK : " + bentrok);
      } else {
        //assign calon dan update jumlah matkul
        for (let i = 0; i < calon.length; i++) {
          db.query(
            query_assign_calon,
            [calon[i], idmk, idkelas],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              // console.log(result);
              db.query(query_update_calon, [calon[i]], (err, result) => {
                if (err) {
                  console.log(err);
                }
                // console.log(result);
                db.query(query_update_kelas, [idmk, idkelas], (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  // console.log(result);
                  db.query(query_update_jadwal, [hari, awal, akhir, calon[i]], (err, result) => {
                    if (err) {
                      console.log(err);
                    }

                    //asdos berhasil di assign
                    console.log("berhasil assign asdos");
                    
                  }
                  );


                });
              });
            }
          );
        }
        res.json("ok");
      }
    } else {
      console.log("result cek kosong bentrok");
      let bentrok = ["bentrok"];
      res.status(409).send(bentrok);
    }
  });
});

//ambil data jadwal asdos
KoordinatorRoute.get("/koordinator/get-jadwal-asdos/:id", auth(['koordinator']), (req, res) => {
  const id = req.params.id;
  
  const query =
    "SELECT hari,awal,akhir FROM jadwal WHERE id_calon = ?;";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);

    res.json(result);
  });
});


//uji email
const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mascotmrpdv@gmail.com",
    // pass: "rxzy jski qccp cvzd",

    pass: "gtlp wzuo vsfq cdop",
  },
};

//kirim email
const send = (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};

//generate password
function generatePassword() {
  const password = generatepassword.generate({
    length: 8,
    numbers: true,
    uppercase: true,
    lowercase: true,
    excludeSimilarCharacters: true,
  });
  console.log(password);
  return password;
}


//route kirim email
KoordinatorRoute.post("/koordinator/kirimemail", auth(['koordinator']), async (req, res) => {
  const { to, subject, text } = req.body;

  const query1 = `SELECT DISTINCT calon.id_calon as npm,email, assigned.id_calon as assigned, nama_calon 
  FROM calon 
  LEFT OUTER JOIN assigned ON calon.id_calon = assigned.id_calon;`;

  const data_diri = await new Promise((resolve, reject) => {
    db.query(query1, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

  for (const record of data_diri) {
    if (record.assigned == null) {
      const emailDataNotAssigned = {
        from: '"INFORMATIKA UNPAR" <informatika@gmail.com>',
        to: req.body.to || record.email,
        subject: subject || "INFORMASI PENDAFTARAN ASISTEN DOSEN",
        text:
          text ||
          `"Halo ${record.nama_calon} \n \n Maaf, Anda tidak terpilih sebagai asisten dosen dikarenakan jadwal anda bentrok atau anda tidak memenuhi syarat. \n \n Terima kasih.`,
      };
      send(emailDataNotAssigned);
    } else {
      const password = generatePassword();
      const emailData = {
        from: '"INFORMATIKA UNPAR" <informatika@gmail.com>',
        to: req.body.to || record.email,
        subject: subject || "INFORMASI PENDAFTARAN ASISTEN DOSEN",
        text:
          text ||
          `Dear ${record.nama_calon}, \n \n Berikut kami sampaikan username dan password untuk login sebagai asisten dosen: \n \n Username: ${record.npm} \n Password: ${password} \n \n Terima kasih.`,
      };
      const query = "UPDATE `calon` SET `pw` = ? WHERE `id_calon` = ?";
      db.query(query, [password, record.npm], (err) => {
        if (err) {
          console.log(err);
        }
        console.log("password berhasil diupdate");
      });

      send(emailData);
    }
  }

  res.send("Email sent successfully");
});

export { KoordinatorRoute, KoordinatorRoute as default };
