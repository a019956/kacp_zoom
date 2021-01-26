1. create backend/db/index.js file with following content:

const {Pool} = require('pg');

const pool = new Pool({
    user: 'USER NAME',
    host: 'localhost',
    database: 'DB NAME',
    password: 'DB PASSWORD',
    port: "DB PORTNUMBER",
})
module.exports = {
    query: (text, params) => pool.query(text, params),
};

2. create backend/config.js file with following content:

const env = process.env.NODE_ENV || 'production'

const config = {
	development :{
		APIKey : 'API KEY FROM ZOOM APPLICATION',
		APISecret : 'API SECRET FROM ZOOM APPLICATION'
	},
	production:{	
		APIKey : 'API KEY FROM ZOOM APPLICATION',
		APISecret : 'API SECRET FROM ZOOM APPLICATION'
	}
};

module.exports = config[env]


3. create backend/.env file with following content:

PGUSER=postgres
PGHOST=localhost
PGPASSWORD=(password)
PGDATABASE=(database name)
PGPORT=(database port)