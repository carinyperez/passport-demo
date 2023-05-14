const User = require('../models/User');
const bcrypt = require('bcrypt')

const signUpUser = async function(req, res, next) {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await User.create({ username: req.body.username, password: hashedPassword });
		let messages = [];
		if (req.session.messages) {
			messages = req.session.messages;
			req.session.messages = [];
		}
		res.render("pages/index", {user: req.body, messages})
	  } catch (err) {
		return next(err);
	  }
}


const restrictedPage = function(req, res) {
	if (!req.session.pageCount) {
		req.session.pageCount = 1;
	  } else {
		req.session.pageCount++;
	  }
	res.render('pages/restricted', { pageCount: req.session.pageCount });
}


module.exports = {signUpUser, restrictedPage}