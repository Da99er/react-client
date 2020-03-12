const webpack = require('webpack');
const { join, resolve } = require('path');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MODE = process.env.MODE || 'development';
const ANALYZER = Boolean(process.env.ANALYZER);
const PATH_TO_CLIENT = resolve(__dirname);
const PATH_TO_TEMP = join(PATH_TO_CLIENT, 'temp');

const {
    PATH_TO_BUNDLE,
    PATH_TO_PUBLIC,
} = require(join(PATH_TO_CLIENT, 'globals', 'pathTo'));

const isDevelope = MODE !== 'production';
const isProduction = MODE === 'production';

const recursiveIssuer = (m) => {

    if (m.issuer) {

        return recursiveIssuer(m.issuer);

    } else if (m.name) {

        return m.name;

    } else {

        return false;

    }

};

const createWebpackConfig = () => {

    const config = {
        bail: true,
        mode: MODE,
        plugins: [],
        devtool: isProduction ? '' : 'inline-source-map',
        module: {
            exprContextCritical: false,
            rules: [],
        },
        optimization: {},
        context: resolve(PATH_TO_CLIENT),
    };

    config.entry = {
        client: resolve(PATH_TO_CLIENT, 'client'),
        server: resolve(PATH_TO_CLIENT, 'server'),
        routes: resolve(PATH_TO_TEMP, 'routes'),
    };

    config.output = {
        filename: '[hash].[name].js',
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
        ROOTDIR: JSON.stringify(__dirname),
        MODE: JSON.stringify(MODE),
    }));

    config.plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[hash].[name].css',
        chunkFilename: '[id].css',
    }));

    config.plugins.push(new HtmlWebpackPlugin({
        filename: 'index.html',
        template: join(PATH_TO_CLIENT, 'templates', 'index.html'),
        inject: true, // output links will be add in code
        minify: {
            html5: true,
            collapseWhitespace: isProduction,
        },
    }));

    config.plugins.push(new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }));

    if (isProduction) {

        config.plugins.push(new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css)$/,
            minRatio: 0.8,
        }));

        config.plugins.push(new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|gif)$/,
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
            '@root': PATH_TO_CLIENT,
            '@temp': resolve(PATH_TO_CLIENT, 'temp'),
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
                            browsers: [
                                'last 2 versions',
                            ],
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
        loaders: ['cache-loader', babelLoader],
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
        test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2)$/i,
        use: {
            loader: 'file-loader',
            query: {
                name: '[hash].[name].[ext]',
            },
        },
    });

    return config;

};

module.exports = () => [
    createWebpackConfig(),
];
