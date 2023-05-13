const express  = require('express');
const router = express.Router();
const {signUpUser, loginUser} = require('../controllers/auth');
const passport = require("passport");

// @route /sign-up
// @desc Sign up 
// @access Public 
router.post('/sign-up', signUpUser)

// @route /login 
// @desc Login 
// @access Public 
router.post(
	"/log-in",
	passport.authenticate("local", {
	  successRedirect: "/",
	  failureRedirect: "/"
	})
);

router.get('/log-out', function(req, res) {
	req.session.destroy(function (err) {
		res.redirect("/");
	});
})


module.exports = router; 