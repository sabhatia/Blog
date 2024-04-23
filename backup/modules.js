const people_module = require('./people.js');

console.log(people_module)

const os = require('os');
console.log(os.cpus())
console.log('Platform: ', os.platform(), '\tHome Dir: ', os.homedir())
// console.log(os)

const fs = require('fs');
if (fs.existsSync('global.js')) {
    console.log('File \'global.js\' exists');
} else {
    console.log('File global.js doesn\'t exist');
}