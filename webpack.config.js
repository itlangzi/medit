const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
// const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')
const hash = require("hash-sum")

const isDev = process.env.NODE_ENV === 'development'

const css_prefix = 'medit-'
const cssLoader = [
    {
        loader: 'css-loader'
    },
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                // require('postcss-cssnext')(),
                require('autoprefixer')(),
                require('cssnano')()
            ]
        }
    },
    {
        loader: 'less-loader',
        options: {
            prependData: function (loaderContext) {
                return `@prefix:${css_prefix};`
            }
        }
    }
]

const seen = new Set();
const nameLength = 4;
const plugins = [

    new FriendlyErrorsWebpackPlugin(),
    // new MonacoEditorWebpackPlugin(),
    new webpack.EnvironmentPlugin({
        VERSION: require('./package.json').version,
        CSS_PREDIX: css_prefix,
    }),
    new webpack.HashedModuleIdsPlugin(),
    // https://segmentfault.com/a/1190000015919928
    new webpack.NamedChunksPlugin(chunk => {
        if (chunk.name) {
            return chunk.name;
        }
        const modules = Array.from(chunk.modulesIterable);
        if (modules.length > 1) {
            const joinedHash = hash(modules.map(m => m.id).join("_"));
            let len = nameLength;
            while (seen.has(joinedHash.substr(0, len))) len++;
            seen.add(joinedHash.substr(0, len));
            return `chunk-${joinedHash.substr(0, len)}`;
        } else {
            return modules[0].id;
        }
    })
]
const config = {
    entry: [isDev ? "react-hot-loader/patch" : false, "./src/index.js"].filter(Boolean),
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'lib'),
        publicPath: '',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default',
        hotUpdateChunkFilename: '[hash].hot-update.js',
        auxiliaryComment: {
            root: 'Root',
            commonjs: 'CommonJS',
            commonjs2: 'CommonJS2',
            amd: 'AMD'
        },
        library: {
            root: 'Medit',
            amd: 'medit',
            commonjs: 'medit',
        },
        jsonpFunction: '__JSONP__',
        globalObject: "this"
    },
    mode: isDev ? 'development' : 'production',
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".tsx", ".ts", ".js", "jsx", ".json"],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    /* externals: {
        'react': 'commonjs react',
        'react-dom': 'commonjs react-dom'
    }, */
    /* optimization: {
        runtimeChunk: true
    }, */
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            // { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },

            {
                test: /\.(less|css)$/,
                use: isDev ? [{ loader: 'style-loader' }].concat(cssLoader) : [MiniCssExtractPlugin.loader].concat(cssLoader)
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                issuer: {
                    test: /\.jsx?$/
                },
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            babel: true,
                            icon: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|eot)(\?.*)?$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'skins/default/fonts',
                        name: '[name].[ext]',
                        publicPath: isDev ? undefined : './fonts'
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif)(\?.*)?$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10
                    }
                }]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                issuer: {
                    test: /\.(less|css)?$/
                },
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10
                    }
                }]
            },
        ]
    },
    plugins: isDev ? [
        ...plugins,
        new webpack.HotModuleReplacementPlugin({
            // multiStep: true
        }),
        // new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'example', 'index.html'),
            favicon: path.resolve(__dirname, 'example', 'favicon.ico'),
            inject: false,
            // multiStep: true,
        }),
        new webpack.NamedModulesPlugin(),
    ] : [
            ...plugins,
            new MiniCssExtractPlugin({
                filename: "skins/default/medit.css",
            })
        ],
    devServer: {
        port: process.env.PORT || 3010,
        host: 'localhost',
        contentBase: './lib',
        publicPath: '',
        open: true,
        hot: true,
        inline: true,
        noInfo: false,
        clientLogLevel: "none"
    }
}

if (process.env.NODE_ENV === 'production') {
    config.optimization = {
        minimizer: [
            new TerserWebpackPlugin({ extractComments: false }),
            new OptimizeCssAssetsWebpackPlugin({})
        ],
    }
}

module.exports = config