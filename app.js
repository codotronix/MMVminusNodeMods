var express = require('express'),
	uAuth = require('./custom_modules/c_uAuth'),
	bodyParser = require('body-parser'), 
	app = express();

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// the static files
app.use(express.static((__dirname, 'public')));
	
app.post('/signup', urlencodedParser, function(req, res) {
	var userObj = req.body;
	uAuth.createUser(userObj, callback_createUser);
	function callback_createUser (status, data) {
		var report = {};
		report.status = status;
		report.data = data;
		res.send(report);
	}
	//res.send('Hey, <br/> Thanks for your interest... <br/>  I am wrtiting the code for validation now... <br/>  See you soon...<br/>    - Suman Barick');
});

app.listen(9090);
console.log('Node Express Server running at localhost:9090');