const express  = require('express');
const router = express.Router();
const {signUpUser, loginUse, restrictedPage} = require('../controllers/auth');
const passport = require("passport");


const authMiddleware = (req, res, next) => {
	if (!req.user) {
	  if (!req.session.messages) {
		req.session.messages = [];
	  }
	  req.session.messages.push("You can't access that page before logon.");
	  res.redirect('/');
	} else {
	  next();
	}
  }

// @route /sign-up
// @desc Sign up 
// @access Public 
router.post('/sign-up', signUpUser)

// @route /log-in 
// @desc Login 
// @access Public 
router.post(
	"/log-in",
	passport.authenticate("local", {
	  successRedirect: "/",
	  failureRedirect: "/",
	  failureMessage: true
	})
);


// @route /log-out
// @desc Log out 
// @access Public  
router.get('/log-out', function(req, res) {
	req.session.destroy(function (err) {
		res.redirect("/");
	});
})


// @route /restricted
// @desc Restricted page
// @access Private
router.get('/restricted',authMiddleware, restrictedPage)


module.exports = router; 