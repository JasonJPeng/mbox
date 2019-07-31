//
//  This is an example of using Promise to avoid call back from readFile
//

const fs = require('fs');

var arrLine = [];
var fileName = process.argv[2];

// ==================================================================
// ======================================================================

async function getArray() {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', function (err, f) {
            arrLine =  f.split('\n')
            console.log("1------" , arrLine);
            resolve(arrLine);
        });
    })

}

async function start() {
    let lines = await getArray();
    console.log("2-------", lines);


}


start();