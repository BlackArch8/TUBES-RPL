//import library
import express from "express";
import mysql from "mysql";
import bodyPafrser from "body-parser";
import session from "express-session";
import path from "path";
import crypto from "crypto";


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
import {RegisterRoute, DataDiriRoute, UploadNilaiRoute} from "./routes/Register.js";
// Step 1: Choose Status
app.use('/register/isi-status', RegisterRoute);

// Step 2: Fill Personal Information
app.use('/register/data-diri', DataDiriRoute);

// Step 3: Upload Nilai
app.use('/register/upload-nilai',UploadNilaiRoute); 
app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
  