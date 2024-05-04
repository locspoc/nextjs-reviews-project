/** @type {import('next').NextConfig} */

module.exports = {
	// output: 'export',
	images: {
		remotePatterns: [
			{
				hostname: 'localhost',
				pathname: '/uploads/**',
				port: '1337',
				protocol: 'http',
			},
		],
	},
};
