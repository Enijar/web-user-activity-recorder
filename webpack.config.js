const path = require('path');

module.exports = (env, argv) => ({
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: 'web-user-activity-recorder.js',
        path: path.resolve(__dirname, 'server', 'public', 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: argv.mode === 'development' ? 'source-map' : false
});
