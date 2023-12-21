import express from 'express';
import multer from 'multer';
import fs, { read } from 'fs';
import csv from 'fast-csv';
import path from 'path';

import {db} from '../database/database.js';

const RegisterRoute = express.Router();

RegisterRoute.get('/register/isi-status', (req, res) => {
    res.render('register/Status');
});

//data diri
let status;
RegisterRoute.get('/register/data-diri', (req, res) => {
    res.render('register/DataDiri');
});
let data_diri = [];
RegisterRoute.post("/register/data-diri", (req, res) => {
  status = false;
  data_diri.push({
    npm: req.body.npm,
    nama: req.body.namalengkap,
    email: req.body.email,
    jumlah_matkul: req.body.jumlah_matkul,
  });

  console.log(data_diri);

  res.redirect("/register/upload-nilai");
});

RegisterRoute.get('/register/data-diri-alumni', (req, res) => {
    res.render('register/DataDiriAlumni');
});
RegisterRoute.post("/register/data-diri-alumni", (req, res) => {
    status = true;
    data_diri.push({
      npm: req.body.npwp,
      nama: req.body.namalengkap,
      email: req.body.email,
      jumlah_matkul: req.body.jumlah_matkul,
    });
  
    console.log(data_diri);
  
    res.redirect("/register/upload-nilai");
  });

  let filename;
  //multer
  const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./Nilai_data");
    },
    filename: (req, file, cb) => {
      //ganti nama filenya ke npm
      cb(null, data_diri[data_diri.length - 1].npm + ".csv");
    },
  });
  const upload = multer({ storage: filestorage });


RegisterRoute.get('/register/upload-nilai', (req, res) => {
    res.render('register/UploadNilai');
});
RegisterRoute.post("/register/upload-nilai", upload.single("nilai"), (req, res) => {
  console.log(req.file);
  filename = req.file.filename;
  const __dirname = './Nilai_data'
  readCSVFile(__dirname + "/" + req.file.filename);
  res.redirect("/register/matakuliah-alumni");
});

//read csv
async function readCSVFile(path) {
  try {
    const stream = fs.createReadStream(path);
    const csvData = await new Promise((resolve, reject) => {
      const data = [];
      const filestream = csv
        .parse({ delimiter: ';' })
        .on('data', (row) => data.push(row))
        .on('end', () => resolve(data))
        .on('error', (error) => reject(error));

      stream.pipe(filestream);
    });

    csvData.shift(); // Remove the header

    const query1 =
      "INSERT INTO `nilai` (`id_calon`, `idmk`, `nilai`) VALUES (?, ?, ?);";

      for (let i = 0; i < csvData.length; i++) {
        await executeQuery(query1, [data_diri[data_diri.length - 1].npm, csvData[i][0], csvData[i][1]]);
      }


    fs.unlinkSync(path); // Remove the CSV file after processing
  } catch (error) {
    console.error("Error:", error);
  }
}
function executeQuery(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}



RegisterRoute.get('/register/matakuliah', (req, res) => {
    res.render('register/InputMataKuliah');
});
var matkul = [];
RegisterRoute.post("/register/matakuliah", async (req, res) => {
  try {
    const tableData = req.body.tableData;
    const matkul = JSON.parse(tableData);
    console.log(matkul);

    const querydatadiri =
      "INSERT INTO `calon`(`id_calon`, `nama_calon`, `email`, `jumlah_matkul`, `alumni`) VALUES (?,?,?,?,?)";
    const querynilai = "INSERT INTO `info`(`id_calon`, `filename`) VALUES (?,?)";
    const querymatkul =
      "SELECT hari,awal, akhir FROM `kelas` WHERE `idkelas` = ? AND `idmk` = (SELECT idmk FROM `matkul` WHERE namamk = ?)";

    const insertDataDiri = () => {
      return new Promise((resolve, reject) => {
        db.query(
          querydatadiri,
          [
            data_diri[data_diri.length - 1].npm,
            data_diri[data_diri.length - 1].nama,
            data_diri[data_diri.length - 1].email,
            data_diri[data_diri.length - 1].jumlah_matkul,
            status,
          ],
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log("data diri berhasil diinput");
              resolve();
            }
          }
        );
      });
    };

    const insertNilai = () => {
      return new Promise((resolve, reject) => {
        db.query(
          querynilai,
          [data_diri[data_diri.length - 1].npm, filename],
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log("nilai berhasil diinput");
              resolve();
            }
          }
        );
      });
    };

    const insertMatkul = async () => {
      for (let i = 0; i < matkul.length; i++) {
        const result = await new Promise((resolve, reject) => {
          db.query(querymatkul, [matkul[i].kelas, matkul[i].matkul], (err, result) => {
            if (err) {
              reject(err);
            } else {
              console.log("matkul berhasil diinput");
              console.log(result);
              resolve(result);
            }
          });
        });

        await new Promise((resolve, reject) => {
          const queryJadwal =
            "INSERT INTO `jadwal`(`id_calon`, `hari`, `awal`, `akhir`) VALUES (?,?,?,?)";
          db.query(
            queryJadwal,
            [
              data_diri[data_diri.length - 1].npm,
              result[0].hari,
              result[0].awal,
              result[0].akhir,
            ],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                console.log("jadwal berhasil diinput");
                console.log(result);
                resolve();
              }
            }
          );
        });
      }
    };

    await insertDataDiri();
    await insertNilai();
    await insertMatkul();

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

RegisterRoute.get('/register/matakuliah-alumni', (req, res) => {
    res.render('register/InputAlumni');
});
RegisterRoute.post("/register/matakuliah-alumni", async (req, res) => {
  const tableData = req.body.tableData;
  matkul = JSON.parse(tableData);
  console.log(matkul);

  const querydatadiri = "INSERT INTO `calon`(`id_calon`, `nama_calon`, `email`, `jumlah_matkul`, `alumni`) VALUES (?,?,?,?,?)";
  const querynilai = "INSERT INTO `info`(`id_calon`, `filename`) VALUES (?,?)";
  const querymatkulalumni = "INSERT INTO `jadwal`(`id_calon`, `hari`, `awal`, `akhir`) VALUES (?,?,?,?)";

  const insertDataDiri = () => {
    return new Promise((resolve, reject) => {
      db.query(
        querydatadiri,
        [
          data_diri[data_diri.length - 1].npm,
          data_diri[data_diri.length - 1].nama,
          data_diri[data_diri.length - 1].email,
          data_diri[data_diri.length - 1].jumlah_matkul,
          status,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("data diri berhasil diinput");
            resolve();
          }
        }
      );
    });
  };

  const insertNilai = () => {
    return new Promise((resolve, reject) => {
      db.query(
        querynilai,
        [data_diri[data_diri.length - 1].npm, filename],
        (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("nilai berhasil diinput");
            resolve();
          }
        }
      );
    });
  };

  const insertMatkul = async () => {
    for (let i = 0; i < matkul.length; i++) {
      await new Promise((resolve, reject) => {
        db.query(
          querymatkulalumni,
          [
            data_diri[data_diri.length - 1].npm,
            matkul[i].hari,
            matkul[i].jamawal,
            matkul[i].jamakhir,
          ],
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log("matkul berhasil diinput");
              resolve();
            }
          }
        );
      });
    }
  }

  await insertDataDiri();
  await insertNilai();
  await insertMatkul();
  //set timeout 1 detik
  setTimeout(() => {
    res.redirect("/");
  }, 1000);
});

export {RegisterRoute ,RegisterRoute as default};