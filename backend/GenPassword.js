const bcrypt = require('bcrypt');

class GenPassword {

constructor(hash_insert, hash_database) {
    this.func(hash_insert, hash_database);
};

inserted_password = '7422';
database_password = 'race';

hash_insert = bcrypt.hash(inserted_password, 10);
hash_databsae = bcrypt.hash(database_password, 10);



bcrypt.compare(inserted_password, hash_database, function(err, verified) {
       if (err) {throw (err);}
        if (verified) {
           console.log('TRUE')
           return;
       }
        else{
           console.log('FALSE')
       }
   })
}