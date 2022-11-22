/*

Title: Not found handler
Description: Not found handler
Author: Adnan Howlader
Date: 18 november 2022



*/

let Handler = {};

Handler.notFoundHandler = (requestProperties,callback) => {
    console.log("not found");
    callback(404, {
        message: "Your requested url was not found",
    });
    

};

module.exports = Handler;

