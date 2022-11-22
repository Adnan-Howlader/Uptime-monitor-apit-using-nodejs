/*
Title:sample handler
Description:sample handler
Author:Adnan
Date: 18 november 2022

*/

let Handler={};

Handler.Sample_handler=(requestProperties,callback)=>{
    console.log(requestProperties);
    callback(200,{
        message:'This is a sample url',
    });
    
}

module.exports=Handler;