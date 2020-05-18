const path = require('path');

module.exports = [
  {
    entry: './src/jquery-utc-time.js',
    externals: { jquery: 'jQuery', bootstrap: 'bootstrap', popper: 'popper' },
    mode: "production",
    output: {
      filename: 'jquery-utc-time.min.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
      globalObject: 'this'
    }
  }
];