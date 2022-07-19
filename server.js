
const express = require('express')
const downloadEmailAttachments = require('download-email-attachments');
const moment = require('moment');
const opDir = `C:/Users/alvar/Desktop/descargas-${moment().format('YYYY-MM-DD')}`;
const email = "alvaro.leiva@websal.com";
const password =  "alvaroagustin1997";
const port = 993;
const host = 'imap.gmail.com';
const todaysDate = moment().format('YYYY-MM-DD');
var reTry = 1;

const app = express()


setInterval(() => {

    var paraObj = {
        invalidChars: /\W/g,
        account: `"${email}":${password}@${host}:${port}`, // all options and params 
        //besides account are optional
        directory: opDir,
        filenameTemplate: '{filename}',
        // filenameTemplate: '{day}-{filename}',
        filenameFilter: /.xml?$/,
        timeout: 10000,
        log: { warn: console.warn, debug: console.info, error: console.error, info: 
        console.info },
        since: todaysDate,
        lastSyncIds: ['234', '234', '5345'], // ids already dowloaded and ignored, helpful 
        //because since is only supporting dates without time
        attachmentHandler: function (attachmentData, callback, errorCB) {
        console.log(attachmentData);
        callback()
       }
      }
     
      var onEnd = (result) => {
     
           if (result.errors || result.error) {
                console.log("Error ----> ", result);
                if(reTry < 4 ) {
                    console.log('retrying....', reTry++)
                    return downloadEmailAttachments(paraObj, onEnd);
                } else  console.log('Failed to download attachment')
          } else console.log("done ----> ");
       }
        downloadEmailAttachments(paraObj, onEnd);
     
     

    
}, 30000);








const server = app.listen(8082, () => {
    console.log(`servidor escuchando en el puerto ${8082}`)
} )




server.on('error', error => console.log(`${error}`) )