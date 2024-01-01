//import library
import express from "express";
import session from "express-session";
import path from "path";


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
import { RegisterRoute } from "./routes/Register.js";
app.use(RegisterRoute);

//koordinator routes
import { KoordinatorRoute } from "./routes/Koordinator/RouteKoordinator.js";
app.use(KoordinatorRoute);

//dosen routes
import { DosenRoute } from "./routes/Dosen/RoutesDosen.js";
app.use(DosenRoute);

//asdos routes
import { asdosRoute } from "./routes/Asdos/RoutesAsdos.js";
app.use(asdosRoute);

//logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


//middleware untuk redirect ke login
app.use('/', (req, res, next) => {
  if (req.path === '/') {
    res.redirect('/login');
  } else {
    next();
  }
});
app.use((req, res, next) => {
  res.status(404).send('404 - Halaman Tidak Ditemukan');
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

export { app, auth };
