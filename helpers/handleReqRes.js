/*


Title: Uptime Monitoring App Handler
Description: Handles Request and Response
Author: Adnan Howlader
Date: 17 november 2022


*/

//imports

const url=require('url');

const querystring= require('node:querystring')//it is used to parse the query string

//get string decoder class
const StringDecoder=require('string_decoder').StringDecoder;//decodes the buffer


//declear decoder object
Decoder=new StringDecoder('utf-8');

var read_data='';

const routes=require('../routes');

const {notFoundHandler}=require('../handlers/routeHandlers/notFoundHandler');


//app scaffolding

let handler={};

handler.handleReqRes=(req,res)=>{


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

     //requested properties

    const requestProperties={
            parsedURl,
            trimmedPathname,
            method,
            queryStringObject,
            headers,
        }





      //get choosen handler
    const choosenHandler=routes[trimmedPathname]?routes[trimmedPathname]:notFoundHandler;

  


     req.on('data',(buffer)=>{
         read_data+=Decoder.write(buffer);//decodes the buffer and adds to read_data
     })

     req.on('end',()=>{
         read_data+=Decoder.end();


         choosenHandler(requestProperties,(statusCode,payload)=>{
            statusCode=typeof(statusCode)=='number'?statusCode:500;
            payload=typeof(payload)=='object'?payload:{};
    
            const payloadString=JSON.stringify(payload);//convert payload to string
    
            res.writeHead(statusCode);
            res.end(payloadString);
    
        });
         
         read_data='';
         res.end('welcome user');
     
     });

    

};


module.exports=handler;