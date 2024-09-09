/** @type {import('next').NextConfig} */
module.exports = {
	// output: 'export',
	images: {
		// unoptimized: true,
		// loader: 'custom',
		// loaderFile: './my/image/loader.js',
		remotePatterns: [
			toRemotePattern(process.env.CMS_IMAGE_PATTERN)
		],
	},
};

function toRemotePattern(urlString){
	const url = new URL(urlString);
	return {
		hostname: url.hostname,
		pathname: url.pathname,
		port: url.port,
		protocol: url.protocol.replace(':',''),
	}
}
