const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        // clean: true,
        publicPath: '/', //will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000
    },
    mode: 'development', // or 'production' or 'none'
    devtool: 'inline-source-map',
    devServer: {
        watchFiles: ['src/**/*.php', 'public/**/*'],
        // static: './dist'

    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'], //'style-loader' comes first and followed by 'css-loader'. If this convention is not followed, webpack is likely to throw errors.
            },
            // asset module: image
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // font
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                  parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                  parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                  parse: json5.parse,
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',

        }),
    ],
    optimization: {
        runtimeChunk: 'single', //was added because in this example we have more than one entrypoint on a single HTML page. Without this, we could get into trouble described here. Read the Code Splitting chapter for more details.
    },
}