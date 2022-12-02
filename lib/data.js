/*

Title: data module
Description: data module
Author: Adnan Howlader
Date: 24 november 2022


*/

//dependencies
const fs = require('fs');
const path = require('path');

//module scaffolding
const lib = {};

//get base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');

//write data to file

lib.create=function (dir,file,data,callback){
    //open file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err1,fileDescriptor)=>{
        
        if(!err1 && fileDescriptor){
            //convert data to string
            const stringData = JSON.stringify(data);
            //write to file and close it
            fs.writeFile(fileDescriptor,stringData,(err2)=>{
                if (!err2){
                     fs.close(fileDescriptor,(err2)=>{
                            if(!err2){
                                callback(false);
                            }else{
                                callback('error closing new file');
                            }
                        });

                }

                else{
                    callback('error writing to new file');


                }
        }  )
    }
        else {
            callback('could not create new file, it may already exist');
        }
        



    });
}



//read data from file

lib.read=function(dir,file,callback){

    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',(err,data)=>{
        
        if (!err && data){
            callback(data);
        }
        else{
            callback('data fetching failed');
        }

    })

}

//update data inside a file

lib.update=function(dir,file,data,callback){
    //open file for writing
    const absoulte_path=lib.baseDir+dir+'/'+file+'.json'
    fs.open(absoulte_path,'r+',(err1,fileDescriptor)=>{

        if(!err1 && fileDescriptor){
            //update file and close it
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor,1,(err2)=>{

                if(!err2){
                    fs.writeFile(fileDescriptor,stringData,(err3)=>{

                           if(!err3){
                               callback('file updated successfully')

                           }
                           else{
                            callback('file not updated successfully')
                           }

                    })


                }
                else{

                    callback('error trunacationg the file');
                }


            })



        }
        else {

            callback('Error opening the file');
        }


    })

           


}

//delete a file

lib.delete=function(dir,file,callback){

    fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err)=>{

        if(!err){

            callback('file is deleted')


        }

        else{
            callback('file dont exist')
        }


    })




}

    



//export
module.exports = lib;