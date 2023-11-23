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

app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
  