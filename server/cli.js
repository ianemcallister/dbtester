/*
*	COMMAND LINE INTERFACE
*
*	This module allows for command line interface
*/

//  NOTIFY PROGRESS
console.log('starting the CLI');

//  DECALARE DEPENDENCIES
var firebase = require('./firebase/firebase.js');

//  DIEFINE MODULE
var CLI = {
    
    testing: testing
};

//  HANDLE PARAMETERS
process.argv.forEach(function (val, index, array) { 
    
    //look at parameter arguments only
    if(index > 1) {

        //look for special characters
        if(val.includes(':')) {
            var pieces = val.split(':');
            CLI[pieces[0]](pieces[1]);
        }

        //if(val.includes('-'))
    }

});

/*
*   TESTING FUNCTION
*
*/
function testing(param) {
    console.log('running the testing function', param);
};