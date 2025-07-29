module.exports = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/path-to-app' : '',
    output: 'export',
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                electron: false
            };
        }
        return config;
    },
}
