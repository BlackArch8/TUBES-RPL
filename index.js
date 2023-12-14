//import library
import express from "express";
// import mysql from "mysql";
// import bodyPafrser from "body-parser";
// import session from "express-session";
import path from "path";
// import crypto from "crypto";
// import nodemailer from "nodemailer";
// import validator from "validator";
import multer from "multer";



const app = express();
const staticPath = path.resolve("public");
app.use('/public', express.static(staticPath));
app.use("/Nilai_data", express.static("Nilai_data"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//connect database
// import {db} from "./database/database.js";

//middleware
// const auth = (req, res, next) => {
//   if (req.session.npm) {
//     next();
//   } else {
//     res.redirect("/");
//   }
// };



//login route
import {LoginRoute} from "./routes/Login.js";

app.use('/', LoginRoute);

//register routes
import {RegisterRoute, DataDiriRoute,DataDiriAlumniRoute, UploadNilaiRoute, UploadNilaiAlumniRoute, UploadJadwalMatkul, UploadJadwalMatkulAlumni} from "./routes/Register.js";

//status
app.use('/register/isi-status', RegisterRoute);


//data diri
app.use('/register/data-diri', DataDiriRoute);
let data_diri = [];
app.post('/register/data-diri', (req, res) => {
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
app.use('/register/data-diri-alumni', DataDiriAlumniRoute);
app.post('/register/data-diri-alumni', (req, res) => {
  data_diri.push({
    npm: req.body.npwp,
    nama: req.body.namalengkap,
    email: req.body.email,
    jumlah_matkul: req.body.jumlah_matkul,
  });

  console.log(data_diri);

  res.redirect("/register/upload-nilai-alumni");
});

//multer
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Nilai_data");
  },
  filename: (req, file, cb) => {
    //ganti nama filenya ke npm
    cb(null, data_diri[data_diri.length-1].npm + ".pdf");
  },
});

const upload = multer({ storage: filestorage });

//upload nilai
app.use('/register/upload-nilai',UploadNilaiRoute); 
app.post('/register/upload-nilai', upload.single("nilai"), (req, res) => {
  console.log(req.file);
  res.redirect("/register/matakuliah");
});

app.use('/register/upload-nilai-alumni',UploadNilaiAlumniRoute);
app.post('/register/upload-nilai-alumni', upload.single("nilai"), (req, res) => {
  console.log(req.file);
  res.redirect("/register/matakuliah-alumni");
});

//mata kuliah
app.use('/register/matakuliah', UploadJadwalMatkul);
var matkul = [];
app.post('/register/matakuliah', (req, res) => {
  const tableData = req.body.tableData;
  
  matkul = JSON.parse(tableData);
  
  console.log(matkul);
  res.redirect("/");
  
});

app.use('/register/matakuliah-alumni', UploadJadwalMatkulAlumni);
app.post('/register/matakuliah-alumni', (req, res) => {
  const tableData = req.body.tableData;
  
  matkul = JSON.parse(tableData);
  
  console.log(matkul);
  res.redirect("/");
  
});

//koordinator routes
import {DashBoardRoute, PenugasanRoute, SeleksiRoute, ListAsdosRoute, JadwalRoute, TambahMatkulRoute, SettingRoute} from "./routes/Koordinator/Dashboard.js";

app.use('/koordinator/dashboard', DashBoardRoute);
app.use('/koordinator/seleksi', SeleksiRoute);
app.use('/koordinator/penugasan', PenugasanRoute);
app.use('/koordinator/list-asdos', ListAsdosRoute);
app.use('/koordinator/jadwal', JadwalRoute);
app.use('/koordinator/tambah-matkul', TambahMatkulRoute);
app.use('/koordinator/setting', SettingRoute);

//uji email
// const config = {
//   service : "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth:{
//     user: "apm.clayanonymous@gmail.com",
//     pass: "rxzy jski qccp cvzd",
   

//     //pass: "gtlp wzuo vsfq cdop",
//   },
// };

// const send = (data) => {
//   const transporter = nodemailer.createTransport(config);
//   transporter.sendMail(data, (error, info) => {
//     if(error){
//       console.log(error);
//     }else{
//       console.log("Message sent: " + info.response);
//     }
//   });
// }


app.use(express.json());

// app.post("/api/send", async (req, res) => {
//   const { from, to, subject, text } = req.body;

//   const emailData = {
//     from: '"INFORMATIKA UNPAR" <informatika@gmail.com>',
//     to: to || "doniandrian.talenta@gmail.com", 
//     subject: subject || "INFORMASI PENDAFTARAN ASISTEN DOSEN", 
//     text: text || "Berikut kami sampaikan username dan password untuk login sebagai asisten dosen: \n \n Username: bestie \n Password: sadhwy162 \n \n Terima kasih.", 
//   };

  
//   send(emailData);
//   res.send("Email sent successfully");
// });


app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
  