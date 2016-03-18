var express = require('express');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');


// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan('dev'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.post('/create-user', function(req, res, next) {
	var user = new User();
	console.log(req.body.name);
	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(err) {
		if (err) return next(err);
		res.json('succesfully created a new user');
	});



});

app.get('/', function(req, res) {

	res.render('home');

});

mongoose.connect('mongodb://root:123@ds015929.mlab.com:15929/e-commerce', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("connected to database");
	}
});


app.listen(3000, function(err) {
	if (err) throw err;
	console.log("server is running ");
});