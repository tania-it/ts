const { cwd } = require ('node:process');
const { resolve } = require ('node:path');
const HTMLWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
    mode: 'development',
    context: resolve(cwd(),'./src'),
    devtool: 'source-map',
    entry: {
        main: './index'
    },
    output: {
        path: resolve (cwd(), './dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules:[
            {
             test: /\.ts$/,
             use: 'ts-loader',
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin ({
            template: './index.html',
            inject: 'head',
            scriptLoading: 'defer',
        }),
    ],
};