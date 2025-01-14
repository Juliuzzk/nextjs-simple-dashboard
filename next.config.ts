import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: ['ui-avatars.com'], // Agrega los dominios permitidos aquí
		dangerouslyAllowSVG: true,
	},

	webpack: (config) => {
		config.resolve.alias['pg-native'] = false; // Exclude pg-native
		return config;
	},
};

export default nextConfig;
