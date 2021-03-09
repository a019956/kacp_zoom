const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	development :{
		APIKey : 'r48IF3SOT1ixp4PI80auVw',
		APISecret : 'cPAw1ZbXRv7r7YjckyEjzAV2LyswrpdawzXs'
	},
	production:{	
		APIKey : 'r48IF3SOT1ixp4PI80auVw',
		APISecret : 'cPAw1ZbXRv7r7YjckyEjzAV2LyswrpdawzXs'
	}
};

module.exports = config[env]
