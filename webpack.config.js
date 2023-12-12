const { cwd } = require('node:process');
const { resolve } = require('node:path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, flags) => {
    const isProd = flags.mode === 'production';

    return {
        mode: isProd ? 'production' : 'development',
        context: resolve(cwd(), './src/todo-app'),
        devtool: 'source-map',
        entry: {
            //main: './form.ts'
            main: './index'
        },
        output: {
            //path: resolve(cwd(), './dist'),
            path: resolve(cwd(), './dist/todo'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        resolve: {
            extensions: ['.tsx', '.ts', 'jsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                },
            ],
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: './index.html',
                inject: 'head',
                scriptLoading: 'defer',
            }),
        ],
        devServer: {
            port: 8181,
        }
    };
};
