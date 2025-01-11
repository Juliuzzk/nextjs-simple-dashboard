import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack: (config) => {
		config.resolve.alias['pg-native'] = false; // Exclude pg-native
		return config;
	},
};

export default nextConfig;
