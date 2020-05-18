const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const production = process.env.NODE_ENV === 'production' || false;

module.exports = {
    entry: ['./src/jquery-utc-time.js'],
    mode: 'production',
    output: {
        filename: production ? 'jquery-utc-time.min.js' : 'jquery-utc-time.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
        library: 'UtcTime',
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: production,
        minimizer: [
          new TerserPlugin({ })
        ]
    }
};
