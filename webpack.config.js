const path = require('path');

var config = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js',
    },
    devServer: {
        inline: true,
        port: 7000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css?$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}

module.exports = config;