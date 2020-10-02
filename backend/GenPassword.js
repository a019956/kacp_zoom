const bcrypt = require('bcrypt');

let pw = bcrypt.hashSync('12345', 9);
console.log(pw)