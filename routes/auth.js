// middleware
const auth = (req, res, next) => {
    if (req.session.npm) {
      next();
    } else {
      res.redirect("/");
    }
  };

  export {auth};