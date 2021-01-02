const webpack = require('webpack');
const { resolve } = require('path');

const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DOMAIN_NAME = process.env.DOMAIN_NAME || 'localhost';
const MODE = process.env.MODE || 'development';
const ANALYZER = Boolean(process.env.ANALYZER);

const ROOT_DIR = resolve(__dirname);

const {
    PATH_TO_BUNDLE,
    PATH_TO_PUBLIC,
} = require(resolve(__dirname, 'globals', 'pathTo'));

const PATH_TO_TEMP = resolve(ROOT_DIR, 'temp');

const isDevelope = MODE !== 'production';
const isProduction = MODE === 'production';

function recursiveIssuer(m) {

    if (m.issuer) {

        return recursiveIssuer(m.issuer);

    } else if (m.name) {

        return m.name;

    } else {

        return false;

    }

}

function createWebpackConfig() {

    const config = {
        bail: true,
        mode: MODE,
        plugins: [],
        devtool: isProduction ? false : 'inline-source-map',
        module: {
            exprContextCritical: false,
            rules: [],
        },
        optimization: {},
        context: resolve(ROOT_DIR),
        watchOptions: {
            ignored: /(node_modules|bower_components)/,
        },
    };

    config.entry = {
        client: resolve(ROOT_DIR, 'client'),
        server: resolve(ROOT_DIR, 'server'),
        routes: resolve(PATH_TO_TEMP, 'routes'),
    };

    config.output = {
        filename: '[fullhash].[name].js',
        path: PATH_TO_BUNDLE,
        publicPath: PATH_TO_PUBLIC,
        library: 'myLib',
        libraryTarget: 'umd',
        globalObject: 'this',
    };

    config.optimization.splitChunks = {
        cacheGroups: {
            indexStyles: {
                name: 'index',
                test: (m, c, entry = 'index') =>
                    m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                chunks: 'all',
                enforce: true,
            },
        },
    };

    config.plugins.push(new webpack.DefinePlugin({
        MODE: JSON.stringify(MODE),
        'process.env.DOMAIN_NAME': JSON.stringify(DOMAIN_NAME),
    }));

    config.plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[fullhash].[name].css',
        chunkFilename: '[id].css',
    }));

    config.plugins.push(new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }));

    if (isProduction) {

        config.plugins.push(new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }));

        config.plugins.push(new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
                params: {
                    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
            },
            threshold: 10240,
            minRatio: 0.8,
        }));

        config.optimization.minimizer = [new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false,
                },
            },
        }), new OptimizeCssAssetsPlugin({})];

    }

    if (ANALYZER) {

        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            generateStatsFile: true,
            statsOptions: { source: false },
        }));

    }

    config.resolve = {
        extensions: [
            '.js', '.json', '.css', '.scss',
        ],
        alias: {
            '@root': ROOT_DIR,
            '@temp': PATH_TO_TEMP,
        },
    };

    const babelPlugins = [];

    babelPlugins.push('@babel/plugin-proposal-class-properties');

    babelPlugins.push(['@babel/plugin-transform-runtime',
        {
            regenerator: true,
        },
    ]);

    const babelLoader = {
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    '@babel/env',
                    {
                        targets: {
                            ie: '11',
                            safari: '10',
                        },
                    },
                ],
                '@babel/react',
            ],
            plugins: babelPlugins,
        },
    };

    config.module.rules.push({
        test: /\.js$/,
        use: ['cache-loader', babelLoader],
        exclude: /(node_modules|bower_components)/,
    });

    config.module.rules.push({
        test: /\.(css|scss)$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: { localIdentName: '[local]__[hash:base64:5]' },
                    sourceMap: isDevelope,
                },
            }, {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        sourceMap: isDevelope,
                        sourceMapContents: isDevelope,
                    },
                },
            },
        ],
    });

    config.module.rules.push({
        test: /\.(jpe?g|png|gif|svg|ico|ttf|eot|woff|woff2)$/i,
        use: {
            loader: 'file-loader',
            options: {
                name: '[hash].[name].[ext]',
            },
        },
    });

    return config;

}

module.exports = () => [
    createWebpackConfig(),
];
