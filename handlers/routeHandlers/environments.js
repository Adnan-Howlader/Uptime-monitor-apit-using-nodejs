/*
    Title: Environments variable
    Description: Environments variable    
    Author:Adnan Howlader
    Date: 22 november 2022
   
*/

//module scaffolding

let environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',

};

environments.production = {
    port: 5000,
    envName: 'production',

};



const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';


const environmentToExport = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;



