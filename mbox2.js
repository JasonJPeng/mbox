//
// Example of using readline
//
//   https://itnext.io/using-node-js-to-read-really-really-large-files-pt-1-d2057fe76b33

const readline = require('readline');
// const stream = 
const fs = require('fs');
const buffer = [];
var  statusRev = false;
// var revFile = process.argv[2]  + "-rev";
var revFile = "rev.txt"

instream = fs.createReadStream( process.argv[2])

const rl = readline.createInterface({
    input: instream,
    output: process.stdout
});

rl.on("line", function(line) {
    buffer.push(line);
// find the begin of messahe    
    if (!statusRev) {
      if (line.trim(" ") == "") {
        if (isBegin(buffer)) {
            writeBuffer(buffer);
            buffer=[];
            statusRev = true;
        } 
      }
    } else {
    // end of message -- and ?.?.?.    
      if (isThreeDots(line) && buffer.slice(-1).pop().substring(0,2) === "--") {
          writeReverX2(buffer);
          buffer = [];
          statusRev = false;
      }
    }

    console.log("---  > ", line );
})

rl.on('close', function () {
    console.log("Done");
})

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });


// Need to have "From ", "From: ", "Date: ", "Subject: "
function isBegin(buffer) {
  var testKeys  = [
      "From ", "From: ", "Date: ", "Subject: "
  ];
  buffer.forEach(function(line) {
      if (testKeys.length === 0) {
          return true;
      } else {
          for(var i = 0; i<testKeys.length; i++) {
           if(line.substring(0, testKeys[i].length) === testKeys[i]) {
              testKeys.splice(i, 1);
              i = testKeys.length; 
           }
         }
      }
  })
  return false;
}

// find the pattern of  ?.?.?. such as 2.4.5.
function isThreeDots(str) {
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
   return true;  
}

function writeBuffer(buffer) {
    buffer.forEach(function (line) {
        fs.appendFileSync(revFile, line);
    })  
}


// write in reverse order expcept the last two lines
function writeReverX2(buffer) {
   lastOne = buffer.pop();
   secondLast = buffer.pop();
   
   while (buffer.length > 0) {
    fs.appendFileSync(revFile, buffer.pop())
   }

   fs.appendFileSync(revFile, secondLast);
   fs.appendFileSync(revFile, lastOne);
   
}

