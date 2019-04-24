/*
*	COMMAND LINE INTERFACE
*
*	This module allows for command line interface
*/

//  NOTIFY PROGRESS
console.log('starting the CLI');

//  DECALARE DEPENDENCIES
//var firebase    = require('./firebase/firebase.js');
var asdb        = require('./asdb/asdb.js');

//  DIEFINE MODULE
var CLI = {
    createChannel: createChannel,
    createSeason: createSeason,
    readChannelsList: readChannelsList,
    readAChannel: readAChannel,
    readPopUp: readPopUp,
    testing: testing
};

/*
*   HANDLE PARAMETERS
*
*   
*/  
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
*   CREATE CHANNEL
*
*   Creates a new channel and returns the unique id
*/
function createChannel() {
    asdb.create.channel({
        //  UNCOMMENT THESE IN ORDER TO SAVE AGAIN
        //title: "Bounty",
        //type: "Farmers Market",
        //aka: "Dallas"
    }).then(function success(s) {
        console.log('SUCCESS:');
        console.log(s);
    }).catch(function error(e) {
        console.log('ERROR:');
        console.log(e);
    });
};

/*
*   CREATE SEASON
*
*   Creates a new season and returns the unique id
*/
function createSeason(channelId) {
    asdb.create.season({
        //  UNCOMMENT THESE IN ORDER TO SAVE AGAIN
        channelId: "-LdCiEmPPg2uuqFaouZB",
        title: "2019"
    }).then(function success(s) {
        console.log('SUCCESS:');
        console.log(s);
    }).catch(function error(e) {
        console.log('ERROR:');
        console.log(e);
    });
};


/*
*   READ CHANNELS
*
*   Reads all the records in the Channels collection
*/
function readChannelsList() {
    //  DEFINE LOCAL VARIABLES

    //  NOTIFY PROGRESS
    console.log('reading channels');

    //  HIT METHOD
    asdb.read.channelsList().then(function success(s) {
        console.log('Channels collection:');
        
        var i = 1;
        Object.keys(s).forEach(function(key) {
            console.log(i + ". " + s[key].title + " (" + key + ")");
            i++;
        });

    }).catch(function error(e) {
		console.log("error", e);
	});

};

/*
*   READ A CHANNEL
*
*   Reads a single Channel record
*/
function readAChannel(id) {
    //  DEFINE LOCAL VARIABLES
    //  NOTIFY PROGRESS
    console.log('reading a channel', id);

    //hit
    asdb.read.aChannel('-LdCgjSRL27Y9RruXGE4').then(function success(s) {
        console.log('Channel record:');
        console.log(s);
    }).catch(function error(e) {
		console.log("error", e);
	}); 
};

/*
*   READ POP UP
*
*   Reads the values of a popup location id
*/
function readPopUp(id) {
    //  define local variables
    var path = 'popups/' + id;

    //  notify progress
    console.log('looking for popup id', id);

    //  hit endpoint
    firebase.read(path).then(function success(s) {

        //anythign with an id in it needs to be converted to a title
        console.log('got this record', s);

    }).catch(function error(e) {
		console.log("error", e);
	});

};

/*
*   TESTING FUNCTION
*
*/
function testing(param) {
    console.log('running the testing function', param);
};