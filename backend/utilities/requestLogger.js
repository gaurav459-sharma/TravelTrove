const fs = require('fs');

const RequestLogger = (req, res, next) => {
    let logMessage = `${new Date().toDateString()} - ${req.method} : ${req.url} \n`; 
    fs.appendFile('RequestLogger.txt', logMessage , (err) => {
        if (err) 
         return next(err);
    });
    next();
}
module.exports = RequestLogger;