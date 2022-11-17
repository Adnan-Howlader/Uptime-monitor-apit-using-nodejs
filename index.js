/*

Title:Uptime monitoring app
Description: A Restful API to monitor up or down time of user defined links
Author: Adnan Howlader
Date: 12 november 2022

*/ 

// Dependencies http server
//get string decoder class
const StringDecoder=require('string_decoder').StringDecoder;//decodes the buffer
const http = require('http');

const url=require('url');

const querystring= require('node:querystring')
//declear decoder object
Decoder=new StringDecoder('utf-8');

var read_data='';

//app scaffolding
const app = {
    
};

//configuration
app.config = {port:3000,};

//create server
app.createServer = () => {

    const server=http.createServer(app.handleRequest);

    server.listen(app.config.port,()=>{
        console.log("listening at port ");
    });

    

}


//handle requests

app.handleRequest=(req,res)=>{


       console.log('req.url ',req.url);
       const parsedURl=url.parse(req.url,true)//false means query string will not be parsed

       console.log('Parsedurl ',parsedURl);
       

       //trim the url path
       const trimmedPathname=parsedURl.pathname.replace(/^\/+|\/+$/g,'');

       console.log('trimmedpathname ',trimmedPathname);


       //check the method
       const method=req.method.toLowerCase();
      console.log("request method",method);

       //check the query string
       const queryStringObject=parsedURl.query;
       console.log('querystringobject ',queryStringObject);

        //get the metadata of the request
        const headers=req.headers;
        console.log('headers ',headers);
        req.on('data',(buffer)=>{
            read_data+=Decoder.write(buffer);//decodes the buffer and adds to read_data
        })

        req.on('end',()=>{
            read_data+=Decoder.end();
            console.log('read_data ',read_data);
            read_data='';
            res.end('welcome user');
        
        });

        

        




    
       
};

//start server

app.createServer()

