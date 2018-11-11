/**
 * Homework Assignment #1
 */

//Dependencies
 var http = require('http');
 var url = require('url');
 var config = require('./config');
//Creating server
 var server = http.createServer(function(req, res){
    createServer(req,res);
 });
//Listening server 
 server.listen(config.httpPort, function(){
     console.log('Server started on port: ' + config.httpPort);
 })

//Server Logic
var createServer = function(req, res){
    //Get Url an parse it
    var parseUrl = url.parse(req.url, true);
    //GEt path and trimm it
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    req.on('data', function(){
        console.log("ON DATA");
    });
    req.on('end', function(){
     console.log("ON END");
        //Choose the handler this requeest should go to. 
        var choseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notfound;
        //Construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath
        };
        //Route the request to the handler specified in the router
        choseHandler(data, function(statusCode, payload){
            //Find the status code
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            //Find the payload
            payload = typeof(payload) == 'object' ? payload : {};
            //Confer Json to string
            var payloadString = JSON.stringify(payload);
            //Return response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            
            console.log("Response: " , statusCode, payloadString);
        });


    });
}; 
//Define the handlers
var handlers = {};
//Hello World Handler
handlers.hello = function(data, callback){
    callback(200, {'message' : 'If we give happiness to others we will end up happy.'})
};
//Not found handler
handlers.notfound = function(data, callback){
    callback(404);
};
//Define the router
var router = {
    'hello' : handlers.hello
};
 