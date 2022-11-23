/*

Title:Uptime monitoring app
Description: A Restful API to monitor up or down time of user defined links
Author: Adnan Howlader
Date: 12 november 2022

*/ 
//import from handler to handle request and response

const handler=require('./helpers/handleReqRes');


// Dependencies http server

const http = require('http');

const environment=require('./handlers/routeHandlers/environments');




//app scaffolding
const app = {
    
};

//configuration
app.config = {port:3000,};

//create server
app.createServer = () => {

    const server=http.createServer(app.handleRequest);
    
    server.listen(environment.port,()=>{
        console.log("mode",environment.envName);
        console.log("listening at port ",environment.port);
    });


}

//handle requests
app.handleRequest=handler.handleReqRes;

app.createServer()

