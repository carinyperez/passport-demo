const express = require('express');
const app = express(); 
const connectDB = require('./db/connect');
require('dotenv').config();
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const authRouter = require('./routes/auth');
const bcrypt = require('bcrypt')
const User = require('./models/User');
const LocalStrategy = require("passport-local").Strategy;


app.set("view engine", "ejs");

passport.use(
	new LocalStrategy(async (username, password, done) => {
	  try {
		const user = await User.findOne({ username: username });
		if (!user) {
		  return done(null, false, { message: "Incorrect username" });
		}
		bcrypt.compare(password, user.password, (err, result) => {
		  if (result) {
			return done(null, user);
		  } else {
			return done(null, false, { message: "Incorrect password" });
		  }
		});
	  } catch (err) {
		return done(err);
	  }
	})
  );
  passport.serializeUser(function(user, done) {
	done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
	try {
	  const user = await User.findById(id);
	  done(null, user);
	} catch(err) {
	  done(err);
	};
  });

// middleware 
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));


// homepage 
app.get("/", (req, res) => {
	let messages = [];
	if (req.session.messages) {
		messages = req.session.messages;
		req.session.messages = [];
	}
	res.render("pages/index", {user: req.user, messages});
});


// routes 
app.use('/', authRouter)

const start = async function() {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(process.env.PORT || 5000, () => {
			console.log(`App listening on port 5000`)
		})
	} catch (error) {
		console.log(error)
	}
}

start();



// left off at https://www.theodinproject.com/lessons/nodejs-authentication-basics#creating-users
