const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env, argv) => ({
    entry: [
        path.resolve(__dirname, 'src', 'sass', 'app.scss'),
        path.resolve(__dirname, 'src', 'js', 'app.js'),
    ],
    output: {
        filename: path.join('js', 'app.js'),
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: argv.mode !== 'development',
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: argv.mode === 'development',
            skipFirstNotification: argv.mode !== 'development'
        }),
        new ExtractTextPlugin({
            filename: path.join('css', 'app.css'),
            allChunks: true
        })
    ],
    devtool: 'source-map'
});
