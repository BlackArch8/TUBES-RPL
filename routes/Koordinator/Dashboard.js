import express from 'express';


const DashBoardRoute = express.Router();
//routing login
DashBoardRoute.get('/', (req, res) => {
    res.render('Koordinator/Dashboard');
});

export {DashBoardRoute, DashBoardRoute as default};