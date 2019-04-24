/*
*   AWE SWEET DATA BASE CLIENT
*
*   This script provides all the necessary communcation between the database (firebase) and client requests.
*
*/

//  DEFINE DEPENDENCIES
var firebase = require('../firebase/firebase.js');

//  DEFINE THE MODULE
var db = {
    create: {
        channel: createChannel,
        season: createSeason
    },
    read: {
        channelsList: readChannelList,
        aChannel: readAChannel,
        popup: readPopup
    }
};

//  CREATE FUNCTIONS

/*
*   CREATE CHANNEL
*
*   This function creates a new channel object
*/
function createChannel(object) {
    //  DEFINE LOCAL VARIABLES

    //  RETURN ASYNC WORK
    return new Promise(function(resolve, reject) {
        firebase.push('channels', object).then(function success(s) {
            resolve(s);
        }).catch(function error(e) {
            reject(e);
        });

    });

};

/*
*   CREATE SEASON
*
*   This function creates a new season object
*/
function createSeason(object) {
    //  DEFINE LOCAL VARIABLES
    
    //  RETURN ASYNC WORK
    return new Promise(function(resolve, reject) {
        firebase.push('seasons', object).then(function success(s) {
            resolve(s);
        }).catch(function error(e) {
            reject(e);
        });

    });

};

//  READ FUNCTIONS

/*
*   READ CHANNELS
*
*   This function reads on the channels in the database
*/
function readChannelList() {
    //  DEFINE LOCAL VARIABLES


    //  RETURN ASYNC WORK
    return new Promise(function(resolve, reject) {
        firebase.readOnce('channels').then(function success(s) {

            resolve(s);
        }).catch(function error(e) {
            reject(e);
        });
    });

};

/*
*   READ CHANNELS
*
*   This function reads on the channels in the database
*/
function readAChannel(id) {
    //  DEFINE LOCAL VARIABLES
    var path = 'channels';

    //  RETURN ASYNC WORK
    return new Promise(function(resolve, reject) {
        firebase.readOnce('channels/' + id).then(function success(s) {

            console.log('got this record');
            console.log(s);

            //  READ SEASONS
            firebase.readOn('seasons', 'channelId', id).then(function success(ss) {
                s['seasons'] = ss;
                resolve(s);
            }).catch(function error(ee) {
                reject(ee);
            });

        }).catch(function error(e) {
            reject(e);
        });
    });
};

/*
*   READ POPUP
*
*   This function reads the data from the popup colleciton and returns usable data
*   
*   PROMISE
*
*   @param: channel
*   @param: date
*   @param: id
*   @returns: object {
    channel_id: STRING
    channel_name: STRING
    end: DATE_TIME
    kit_id: STRING
    kit_name: NUMBER
    location_id: STRING
    location_name: STRING
    season_id: STRING
    season_name: STRING
    start: DATE_TIME
    shifts: ARRAY(SHIFTS_LIST)
    sales: OBJECT(SALES_LEDGER)
    resources: OBJECT(RESOURCES_LEDGER)
}
*/
function readPopup(channel, date, id) {
    //  DEFINE LOCAL VARIABLES
    var allPromises = [
        firebase.readcomplex('popups/' + id),
        firebase.readcomplex()
    ];

    //  RETURN ASYNC WORK
    return new Promise(function(resolve, rejet) {

        //  AGREGATE ALL PROMISE DATA
        Promise.all(allPromises).then(function success(s) {

        }).catch(function error(e) {
			reject(e);
		});

    });

}

//  RETURN NODE MODULE
module.exports = db;
