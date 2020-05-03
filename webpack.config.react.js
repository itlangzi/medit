const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')
const config = merge({}, baseConfig, {
    entry: ["./src/Editor.js"],
    output: {
        filename: "react/index.js",
    },
    externals: {
        'react': 'commonjs react',
        'react-dom': 'commonjs react-dom'
    }
})
module.exports = config