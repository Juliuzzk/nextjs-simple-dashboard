import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
	webpack: (config) => {
		return config;
	},
};

export default nextConfig;
