//middleware
const auth = (req, res, next) => {
    if (req.session.npm) {
      next();
    } else {
      res.redirect("/");
    }
  };

// const auth = (roles) =>{
//   return (req, res, next) => {
//     if (req.session.npm && roles.includes(req.session.role)) {
//       next();
//     } else {
//      res.status(403).render('forbidden');
//     }
//   };
// };

  export {auth};