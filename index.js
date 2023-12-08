//import library
import express from "express";
import mysql from "mysql";
import bodyPafrser from "body-parser";
import session from "express-session";
import path from "path";
import crypto from "crypto";
import nodemailer from "nodemailer";


const app = express();
const staticPath = path.resolve("public");
app.use(express.static(staticPath));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//login route
import {LoginRoute} from "./routes/Login.js";

app.use('/login', LoginRoute);

//register routes
import {RegisterRoute, DataDiriRoute, UploadNilaiRoute, UploadJadwalMatkul} from "./routes/Register.js";

//status
app.use('/register/isi-status', RegisterRoute);

//data diri
app.use('/register/data-diri', DataDiriRoute);

//mata kuliah
app.use('/register/matakuliah', UploadJadwalMatkul);

//koordinator 
import {DashBoardRoute} from "./routes/Koordinator/Dashboard.js";

app.use('/koordinator/dashboard', DashBoardRoute);


//uji email
const config = {
  service : "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth:{
    user: "apm.clayanonymous@gmail.com",
    pass: "rxzy jski qccp cvzd",
   

    //pass: "gtlp wzuo vsfq cdop",
  },
};

const send = (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (error, info) => {
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + info.response);
    }
  });
}


app.use(express.json());

app.post("/api/send", async (req, res) => {
  const { from, to, subject, text } = req.body;

  const emailData = {
    from: '"INFORMATIKA UNPAR" <informatika@gmail.com>',
    to: to || "doniandrian.talenta@gmail.com", 
    subject: subject || "INFORMASI PENDAFTARAN ASISTEN DOSEN", 
    text: text || "Berikut kami sampaikan username dan password untuk login sebagai asisten dosen: \n \n Username: bestie \n Password: sadhwy162 \n \n Terima kasih.", 
  };

  
  send(emailData);
  res.send("Email sent successfully");
});

//upload nilai
app.use('/register/upload-nilai',UploadNilaiRoute); 
app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
  