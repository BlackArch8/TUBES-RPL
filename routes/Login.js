import express from 'express';


const LoginRoute = express.Router();
//routing login
LoginRoute.get('/', (req, res) => {
    res.render('Login');
});

export {LoginRoute, LoginRoute as default};
