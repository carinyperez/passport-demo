const User = require('../models/User');
const bcrypt = require('bcrypt')

const signUpUser = async function(req, res, next) {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await User.create({ username: req.body.username, password: hashedPassword });
		res.redirect("/");
	  } catch (err) {
		return next(err);
	  }
}


module.exports = {signUpUser}