/*
*	SERVER APP
*
*	This module runns the express server
*/

//  NOTIFY PROGRESS
console.log('starting the server');

//  DECALARE DEPENDENCIES
var express		= require('express');
var bodyParser 	= require('body-parser');

//  RETURN THE EXPRESS OBJECT
var serverApp = express();

//  SET ENVIRONMENT VARIABLES
var port = process.env.PORT || 3000;

//  GET THE URL ENCODED PARSER
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

/*
*	USE Declarations
*
*/
//  DEFINE OUR BODY PARSERS 
serverApp.use(jsonParser); // for parsing application/json
serverApp.use(urlencodedParser); // for parsing application/x-www-form-urlencoded

//  SERVE UP A STATIC ASSET
serverApp.use(express.static('dist'));

//  TRACK URL REQUESTS
serverApp.use('/', function(req, res, next) {
	//log the url to the console
	console.log('Request Url: ' + req.url);

	next();
});