//includes necesarry classes to use for this project
var express = require('express')
var app = express()
//Needed for date processing, then sets up the class
var moment = require('moment');
moment().format();

//Same port that is used in the .env file
var port = process.env.PORT || 8080;
// Get query from URL and eventally push it to page
app.get('/:query', function(req, res) {
//Create 2 vars to hold the 2 differrent dates in their respective formats
    var verifiedDate;
    var verifiedUnix;
//Gets the input of the user, and finds what format the string is in
    if(moment(req.params.query, "MMMM D, YYYY").isValid() && moment(req.params.query, "X", true).isValid() == false) {
//Executes if input is in the natural format
        console.log("natural fomat")
        verifiedDate = moment(req.params.query, "MMMM D, YYYY").format("MMMM D, YYYY")
        verifiedUnix = moment(req.params.query, "MMMM D, YYYY").unix()
    } else if (moment(req.params.query, "X",true).isValid()) {
//Executes if input is in the unix format
        console.log("unix format")
        verifiedUnix = moment(req.params.query, "x",true )
        verifiedDate = moment(req.params.query, "X", true).format("MMMM D, YYYY")
    } else {
//Executes if the format is unrecognized
        verifiedUnix = "null"
        verifiedDate = "null"
    }
//Sends the JSON over to the app express server, and then closes the connection
    res.end('{"unix":"'+verifiedUnix+'","natural": "'+verifiedDate+'"}' )
});
//Listens for the JSON sent over in "res.end", and then prints that the the web browsers screen
app.listen(port)

/*
Input:
https://time-micro-armadillodude.c9users.io/1450569600
Output:
{"unix":"1450569600","natural":"December 20, 2015"}
*/
