/** @type {import('next').NextConfig} */

module.exports = {
	// output: 'export',
	images: {
		// unoptimized: true,
		// loader: 'custom',
		// loaderFile: './my/image/loader.js',
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
