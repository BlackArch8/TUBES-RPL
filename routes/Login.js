import express from 'express';
import db from '../database/database.js';


const LoginRoute = express.Router();
//routing login
LoginRoute.get('/', (req, res) => {
  res.render('Login', { errorMessage: '' }); // error message
});

LoginRoute.post("/", (req, res) => {
    const npm = req.body.Username;
    const password = req.body.Password;
  
    const koordinator = "SELECT * FROM koordinator WHERE id_koord = ? AND pw = ?";
    const dosen = "SELECT * FROM dosen WHERE id_dosen = ? AND pw = ?";
    const asdos = "SELECT * FROM calon WHERE id_calon = ? AND pw = ?";

    if (!npm || !password) {
      return res.render('Login', { errorMessage: 'Username or password cannot be empty.' });
  }
  
    db.query(koordinator, [npm, password], (err, result) => {
      if (err) {
        console.log(err);
  
      }
      if (result.length > 0) {
        console.log(result);
        req.session.nama = result[0].nama_koord;
        req.session.npm = result[0].id_koord;
        req.session.role = "koordinator";
        res.redirect("/koordinator/dashboard");
      } else {
        db.query(dosen, [npm, password], (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            req.session.nama = result[0].nama_dosen;
            req.session.npm = npm;
            req.session.role = "dosen";
            res.redirect("Dosen/Dashboard-Dosen");
            
          }
          else{
            db.query(asdos, [npm, password], (err, result) => {
              if (err) {
                console.log(err);
              }
              if (result.length > 0) {
                req.session.nama = result[0].nama_calon;
                req.session.npm = npm;
                req.session.role = "asdos";
                res.redirect("/asdos/dashboard");
              } else {
                return res.render('Login', { errorMessage: 'Invalid username or password.' });
              }
            });
          }
        });
      }
    });
  });
  

export {LoginRoute, LoginRoute as default};
