const tok = require('jsonwebtoken');
const User = require('../models/User');


const Admin = require('../models/Admin');

const requireAuth = (req, res, next) => {
  const token = req.cookies.tok;

  // check json web token exists & is verified
  if (token) {
    tok.verify(token, 'my secret code', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.tok;
  if (token) {
    tok.verify(token, 'my secret code', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

/* admin */
const AdrequireAuth = (req, res, next) => {
  const token = req.cookies.tok;

  // check json web token exists & is verified
  if (token) {
    tok.verify(token, 'my secret code', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/adlogin');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/adlogin');
  }
};

// check current admin
const checkAdmin = (req, res, next) => {
  const token = req.cookies.tok;
  if (token) {
    tok.verify(token, 'my secret code', async (err, decodedToken) => {
      if (err) {
        res.locals.admin = null;
        next();
      } else {
        let admin = await Admin.findById(decodedToken.id);
        res.locals.admin = admin;
        next();
      }
    });
  } else {
    res.locals.admin = null;
    next();
  }
};


module.exports = { requireAuth, checkUser, AdrequireAuth, checkAdmin };