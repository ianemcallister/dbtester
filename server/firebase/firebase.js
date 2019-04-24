/*
*	FIREBASE
*
*	This module serves as the connection between server and Firebase.com.
*/

//  DECLARE DEPENDENCIES
var admin   = require("firebase-admin");

//  DEFINE LOCAL VARIABLES
var serviceAccount = {
	"type": 						process.env.FB_TYPE,
	"project_id": 					process.env.FB_PROJECT_ID,
	"private_key_id": 				process.env.FB_PRIVATE_KEY_ID,
	"private_key": 					process.env.FB_PRIVATE_KEY,
	"client_email": 				process.env.FB_CLIENT_EMAIL,
	"client_id": 					process.env.FB_CLIENT_ID,
	"auth_uri": 					process.env.FB_AUTH_URI,
	"token_uri": 					process.env.FB_TOKEN_URI,
	//"auth_provider_x509_cert_url": 	process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
	//"client_x509_cert_url": 		process.env.FB_CLIENT_X509_CERT_URL
};

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cnute-b75af.firebaseio.com"
});

//  DEFINE MODULE
var firebase = {
	readOnce: readOnce,
	readOn: readOn,
	readcomplex: readcomplex,
	set: set,
	//update: update,
	push: push,
	test: test
};

function readcomplex(path) {};

/*
*	READ ONCE
*	
*	This function function collects data from firebase
*/
function readOnce(path) {
    
    console.log('reading path once:', path);
	
	//define local variable
	var ref = admin.database().ref(path);

	//return async work
	return new Promise(function(resolve, reject) {

		//hit the database
		ref.once("value")
		.then(function(snapshot) {
		    
			//console.log(snapshot.val());

			//pass the data back
			resolve(snapshot.val());

		});

    });
    
};

/*
*	READ ON
*	
*	This function function collects data from firebase
*/
function readOn(path, child, equalTo) {

	//	NOTIFYING PROGRESS
    console.log('reading path on:', path, child, equalTo);
	
	//define local variable
	var ref = admin.database().ref(path);

	//return async work
	return new Promise(function(resolve, reject) {

		//hit the database
		ref.orderByChild(child).equalTo(equalTo).on("value", function success(snapshot) {
			resolve(snapshot.val());
		});

	});
	
};

/*
*	Set
*	
*	This function saves data to the database
*/
function set(path, data) {

	//	notify progress
	console.log('writing to path path', path);

	//define local variable
	var ref = admin.database().ref(path);

	ref.set(data);
};

/*
*	PUSH
*
*	This function pushes new data on to the model and returns a unique key
*/
function push(path, object) {
	//	DEFINE LOCAL VARAIABLES
	var ref = admin.database().ref(path);

	//	RETURN ASYNC WORK
	return new Promise(function(resolve, reject) {

		//	DEFINE LOCA VARIABLES
		var newChannelRef = ref.push(object);
		var channelId = newChannelRef.key;

		resolve(channelId);
	});

};

function test() {
    console.log('firebase test');
}

//  RETURN NODE MODULE
module.exports = firebase;


