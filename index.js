//import library
import express from "express";
// import mysql from "mysql";
// import bodyPafrser from "body-parser";
import session from "express-session";
import path from "path";
// import crypto from "crypto";
import nodemailer from "nodemailer";
// import validator from "validator";
import multer from "multer";
import generatepassword from "generate-password";

const app = express();
const staticPath = path.resolve("public");
app.use("/public", express.static(staticPath));
app.use("/Nilai_data", express.static("Nilai_data"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connect database
import { db } from "./database/database.js";
app.use(
  session({
    secret: "kelompokf",
    resave: false,
    saveUninitialized: true,
  })
);

//middleware
// const auth = (req, res, next) => {
//   if (req.session.npm) {
//     next();
//   } else {
//     res.redirect("/");
//   }
// };

//login route
import { LoginRoute } from "./routes/Login.js";

app.use("/", LoginRoute);
app.post("/", (req, res) => {
  const npm = req.body.Username;
  const password = req.body.Password;

  const koordinator = "SELECT * FROM koordinator WHERE id_koord = ? AND pw = ?";
  const dosen = "SELECT * FROM dosen WHERE id_dosen = ? AND pw = ?";
  const asdos = "SELECT * FROM calon WHERE id_calon = ? AND pw = ?";

  db.query(koordinator, [npm, password], (err, result) => {
    if (err) {
      console.log(err);

    }
    if (result.length > 0) {
      console.log(result);
      req.session.npm = result[0].id_koord;
      req.session.role = "koordinator";
      res.redirect("/koordinator/dashboard");
    } else {
      db.query(dosen, [npm, password], (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          req.session.npm = npm;
          req.session.role = "dosen";
          res.redirect("/dosen/dashboard");
        }
        else{
          db.query(asdos, [npm, password], (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result.length > 0) {
              req.session.npm = npm;
              req.session.role = "asdos";
              res.redirect("/asdos/dashboard");
            } else {
              res.redirect("/");
            }
          });
        }
      });
    }
  });
});

//register routes
import {
  RegisterRoute,
  DataDiriRoute,
  DataDiriAlumniRoute,
  UploadNilaiRoute,
  UploadNilaiAlumniRoute,
  UploadJadwalMatkul,
  UploadJadwalMatkulAlumni,
} from "./routes/Register.js";

//status
app.use("/register/isi-status", RegisterRoute);

//data diri
let status;
app.use("/register/data-diri", DataDiriRoute);
let data_diri = [];
app.post("/register/data-diri", (req, res) => {
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

//data diri alumni
app.use("/register/data-diri-alumni", DataDiriAlumniRoute);
app.post("/register/data-diri-alumni", (req, res) => {
  status = true;
  data_diri.push({
    npm: req.body.npwp,
    nama: req.body.namalengkap,
    email: req.body.email,
    jumlah_matkul: req.body.jumlah_matkul,
  });

  console.log(data_diri);

  res.redirect("/register/upload-nilai-alumni");
});

let filename;
//multer
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Nilai_data");
  },
  filename: (req, file, cb) => {
    //ganti nama filenya ke npm
    cb(null, data_diri[data_diri.length - 1].npm + ".pdf");
  },
});

const upload = multer({ storage: filestorage });

//upload nilai
app.use("/register/upload-nilai", UploadNilaiRoute);
app.post("/register/upload-nilai", upload.single("nilai"), (req, res) => {
  console.log(req.file);
  filename = req.file.filename;
  res.redirect("/register/matakuliah");
});

app.use("/register/upload-nilai-alumni", UploadNilaiAlumniRoute);
app.post(
  "/register/upload-nilai-alumni",
  upload.single("nilai"),
  (req, res) => {
    console.log(req.file);
    filename = req.file.filename;
    res.redirect("/register/matakuliah-alumni");
  }
);

//mata kuliah
app.use("/register/matakuliah", UploadJadwalMatkul);
var matkul = [];
app.post("/register/matakuliah", async (req, res) => {
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


app.use("/register/matakuliah-alumni", UploadJadwalMatkulAlumni);
app.post("/register/matakuliah-alumni", async (req, res) => {
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



  res.redirect("/");
});

//koordinator routes
import {
  DashBoardRoute,
  PenugasanRoute,
  SeleksiRoute,
  ListAsdosRoute,
  JadwalRoute,
  TambahMatkulRoute,
  SettingRoute,
} from "./routes/Koordinator/Dashboard.js";

app.use("/koordinator/dashboard", DashBoardRoute);
app.use("/koordinator/seleksi", SeleksiRoute);
app.use("/koordinator/penugasan", PenugasanRoute);
app.use("/koordinator/list-asdos", ListAsdosRoute);
app.use("/koordinator/jadwal", JadwalRoute);
app.use("/koordinator/tambah-matkul", TambahMatkulRoute);
app.use("/koordinator/setting", SettingRoute);

//uji email
const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "apm.clayanonymous@gmail.com",
    pass: "rxzy jski qccp cvzd",

    //pass: "gtlp wzuo vsfq cdop",
  },
};

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
const password = generatepassword.generate({
  length: 8,
  numbers: true,
  uppercase: true,
  lowercase: true,
  excludeSimilarCharacters: true,
});
console.log(password);

app.use(express.json());

app.post("/api/send", async (req, res) => {
  const { to, subject, text } = req.body;

  const emailData = {
    from: '"INFORMATIKA UNPAR" <informatika@gmail.com>',
    to: to || `${data_diri[data_diri.length - 1].email}`,
    subject: subject || "INFORMASI PENDAFTARAN ASISTEN DOSEN",
    text:
      text ||
      `Berikut kami sampaikan username dan password untuk login sebagai asisten dosen: \n \n Username: ${
        data_diri[data_diri.length - 1].npm
      } \n Password: ${password} \n \n Terima kasih.`,
  };

  const query = "UPDATE `calon` SET `pw` = ? WHERE `id_calon` = ?";
  db.query(query, [password, data_diri[data_diri.length - 1].npm], (err) => {
    if (err) {
      console.log(err);
    }
    console.log("password berhasil diupdate");
  });

  send(emailData);
  res.send("Email sent successfully");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
