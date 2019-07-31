//
// Example of using readline
//
//   https://itnext.io/using-node-js-to-read-really-really-large-files-pt-1-d2057fe76b33

const readline = require('readline');
// const stream = 
const fs = require('fs');
var buffer = [];
var  statusRev = false;
// var revFile = process.argv[2]  + "-rev";
var revFile = "rev.txt"

instream = fs.createReadStream( process.argv[2])

const rl = readline.createInterface({
    input: instream
    // output: process.stdout
});
var lineCounter =0;
rl.on("line", function(line) {
    lineCounter++;
    buffer.push(line);
// find the begin of messahe    
    if (!statusRev) {
      if (line.trim(" ") === "") {
        if (isBegin(buffer)) {
            writeBuffer(buffer);
            buffer=[];
            statusRev = true;
        } 
      }
    } else {
    // end of message -- and ?.?.?.    
      if (isThreeDots(line) && buffer[buffer.length-2].substring(0,2) === "--") {
          console.log("...........")
          writeReverX2(buffer);
          buffer = [];
          statusRev = false;
      }
    }

    // console.log("---  > ", line );
})

rl.on('close', function () {
    console.log("Done");
})


// Need to have "From ", "From: ", "Date: ", "Subject: "
function isBegin(buffer) {

    console.log(lineCounter, buffer);

  var testKeys  = [
      "From ", "From: ", "Date: ", "Subject: "
  ];
  buffer.forEach(function(ln) {
          for(var i = 0; i<testKeys.length; i++) {
           if(ln.substring(0, testKeys[i].length) === testKeys[i]) {
              testKeys.splice(i, 1);
              i = testKeys.length; 
           }
        }

    })     
    if (testKeys.length === 0) {      
             return true;
    } else {
         return false;
    }     
}

// find the pattern of  ?.?.?. such as 2.4.5.
function isThreeDots(str) {
    console.log("=====================================", str)
   var str1 = str.split(".");
   if (str1.length < 3) {
       return false;
   } else {
    for (var i=0; i< 3; i++) {
        if (!Number.isInteger(parseInt(str1[i]))) {
            return false;
        }
    }        
   }  
   console.log("===========++++++ ", str)
   return true;  
}

function writeBuffer(buffer) {
    console.log("write buffer ---->   ", buffer )
    buffer.forEach(function (line) {
        fs.appendFileSync(revFile, line + "\n");
    })  
}


// write in reverse order expcept the last two lines
function writeReverX2(buffer) {
   lastOne = buffer.pop();
   secondLast = buffer.pop();
   
   while (buffer.length > 0) {
    fs.appendFileSync(revFile, buffer.pop() + "\n")
   }

   fs.appendFileSync(revFile, secondLast + "\n");
   fs.appendFileSync(revFile, lastOne + "\n");
   
}

