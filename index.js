//import library
import express from "express";
import mysql from "mysql";
import bodyPafrser from "body-parser";
import session from "express-session";
import path from "path";
import crypto from "crypto";
import nodemailer from "nodemailer";
import validator from "validator";
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

import { auth } from "./routes/auth.js";

//login route
import { LoginRoute } from "./routes/Login.js";

app.use("/", LoginRoute);

//register routes
import {
  RegisterRoute,
} from "./routes/Register.js";
app.use(RegisterRoute);


//koordinator routes
import {KoordinatorRoute} from "./routes/Koordinator/RouteKoordinator.js";
app.use(KoordinatorRoute);

//dosen routes
import { DosenRoute} from "./routes/Dosen/RoutesDosen.js";
app.use(DosenRoute);

//asdos routes
import { asdosRoute } from "./routes/Asdos/RoutesAsdos.js";
app.use(asdosRoute);



//logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


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

// app.post("/api/send", async (req, res) => {
//   const { to, subject, text } = req.body;

//   const emailData = {
//     from: '"INFORMATIKA UNPAR" <informatika@gmail.com>',
//     to: to || `${data_diri[data_diri.length - 1].email}`,
//     subject: subject || "INFORMASI PENDAFTARAN ASISTEN DOSEN",
//     text:
//       text ||
//       `Berikut kami sampaikan username dan password untuk login sebagai asisten dosen: \n \n Username: ${
//         data_diri[data_diri.length - 1].npm
//       } \n Password: ${password} \n \n Terima kasih.`,
//   };

//   const query = "UPDATE `calon` SET `pw` = ? WHERE `id_calon` = ?";
//   db.query(query, [password, data_diri[data_diri.length - 1].npm], (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("password berhasil diupdate");
//   });

//   send(emailData);
//   res.send("Email sent successfully");
// });


  

app.listen(8080, () => {
  console.log("Server started on port 8080");
});


export { app, auth };