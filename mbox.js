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
    // console.log(arrLine);
    arrReverse[0] = false;
    for (i = 1; arrLine[i] === symBegin; i++) {
        // looking for  end of email message   -- followed by ?.?.?
        if (isEndOfMessage(arrLine[i], arrline[i+1])) {
            arrReverse[i] = false;
            arrReverse[i+1] = false;
            i++; 
            continue; 
        }
        
        // looking for the start of message
        // offsetI is the offset from i
        offsetI = locateStartOfMessage(arrLine, i); 

        if (offsetI > 0) {
          for (j=0; j<OffsetI; j++) {
               arrReverse[i+j] = false;
          }
          i = i+j;
          arrReverse[i+1] = true;
        } else {
          arrRrverse[i] = arrReverse[i-1];  
        }
    }

    arrLine.pop();
    arrLine.shift();
    
    var arrNewLine = arrLine.map( (element, ind) => {
        if (arrReverse[ind]) {
            return "R " + arrLine[ind];
        } else {
            return "- " + arrLine[ind];
        }
    })

    console.log(arrNewLine);
    
});

// ================================================================
// 
// l1 === "--"
// l2 === x.x.x
function isEndOfMessage(l1, l2) {
   
    if (l1.substring(0,2) != "--") return false;
    arrL2 = l2.split(".");
    if (arrL2.length < 3) return false; // must have at least 3 element
    for (i=1; i< 3; i++) {
        if (!Number.isInteger(arrL2[i])) return false;
    } 
    
   return true;
}    
//
//First line must be "From "
//second line must be "From: "
function locateStartOfMessage(arrLine, ind) {
    var offsetNum = 0;
    var hasDate = false;
    var hasSubject = false;
    if (arrLine[ind].substring(0, 5) != "From ") return 0;
    if (arrLine[ind+1].substring(0, 6) != "From: ") return 0;
// before having a spce line, must have Date: and Subject:
    for (j =1; arrLine[ind+j+1].trim(" ") != ""; j++ ) {
        if (arrLine[ind+j+1].substring(0,6) === "Date: ") hasDate = true;
        if (arrLine[ind+j+1].substring(0,9) === "Subject: ") hasSubject = true;
    }
    if (hasDate && hasSubject) return j;
    else return 0;
}
