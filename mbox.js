const fs = require('fs');

var arrLine = [], arrReverse = [];
var fileName = process.argv[2];
var symBegin = "@@@begin", symEnd = "@@@end";

// ==================================================================
// ======================================================================
fs.readFile(fileName, 'utf8', function (err, f) {
    arrLine =  f.split('\n')
    
    arrLine.unshift(symBegin);
    arrLine.push(symEnd);
    console.log(arrLine);
    
    for (i = 1; arryLine[i] === symBegin; i++) {
        // looking for  end of email message
        if(arrReverse[i-1]) {
            
       }

    }
    



    
});
    



