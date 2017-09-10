const __CONFIG__ = {
	api: {
		port: 3000,
		prefix: '/api',
		version: 'v1'
	},
	bdd: {
		host: 'localhost',
		port: '3306',
		username: 'hapta',
		passowrd: 'Hapta_Dev'
	},
	logger: {
		level: 'debug'
	}
};

global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';
global.__CONFIG__ = __CONFIG__;