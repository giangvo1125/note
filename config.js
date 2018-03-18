var config = {
	development: {
		port: 3019,
		domain: 'localhost',
	},
	production: {
		port: 3019, 
		domain: 'localhost',
	},
	
}
const env = process.env.NODE_ENV || 'development'

module.exports = config[env];
