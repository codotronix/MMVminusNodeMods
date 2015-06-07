var MongoClient = require('mongodb').MongoClient;

var custom_uAuth = {};
//var mongoDbPath = 'mongodb://codotronix:24292392@ds043972.mongolab.com:43972/i1users';
var mongoDbPath = 'mongodb://127.0.0.1:27017/test';

/************* CREATE A TEMPORARY USER IN THE DB ******************/
custom_uAuth.createUser = function (user, callback) {
	MongoClient.connect(mongoDbPath, function(err, db) {
    	if(err) {
    		callback('database connecting error', err);
    		return;
    	}

        /*create a temporary token for user email verfication*/
    	var tempToken = Math.floor(Math.random() * 9999) + 999;
        var tempUser = user;
        tempUser.token = tempUser["_id"] + '#' + tempToken;

        /* _id must be all lowercase, because Mongodb is case sensitive*/
        tempUser["_id"] = tempUser["_id"].toLowerCase();

    	db.collection('users').insert(tempUser, function(err, inserted) {
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
/////////////////////////////////////////////////////////////////////

module.exports = custom_uAuth;