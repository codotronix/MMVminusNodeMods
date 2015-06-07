var MongoClient = require('mongodb').MongoClient;

var custom_uAuth = {};
//var mongoDbPath = 'mongodb://codotronix:24292392@ds043972.mongolab.com:43972/i1users';
var mongoDbPath = 'mongodb://127.0.0.1:27017/test';

custom_uAuth.createUser = function (user, callback) {
	MongoClient.connect(mongoDbPath, function(err, db) {
    	if(err) {
    		callback('database connecting error', err);
    		return;
    	}

    	//var user = { '_id' : email, 'pswd' : pswd };

    	db.collection('user2').insert(user, function(err, inserted) {
        	if(err) {        		
        		callback('insert_error', err);
        		return db.close();
        	}
        	console.dir("Successfully inserted: " + JSON.stringify(inserted));
        	callback('insert_success', inserted);
        	return db.close();        	
    	});
    });
};

module.exports = custom_uAuth;