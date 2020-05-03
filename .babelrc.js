// https://github.com/GoogleChromeLabs/webpack-libs-optimizations
// https://juejin.im/post/5cd38720e51d456e55623bdc
module.exports = {
    presets: [
        ["@babel/env", { modules: false }],
        "@babel/react",
        // ["@babel/typescript", { isTSX: true, allExtensions: true }]
    ],
    plugins: [
        "@babel/transform-runtime",
        ["@babel/proposal-decorators", { decoratorsBeforeExport: true }],
        "@babel/proposal-class-properties",
        [
            'prismjs', {
                "languages": [
                    "javascript", "css", "markup", "clike", "c", "django", "docker", "ejs", "erlang",
                    "csharp", "cpp", "cmake", "dart", "markdown", "java", "bash", "excel-formula", "git",
                    "go", "groovy", "graphql", "haml", "http", "json", "jsonp", "json5", "kotlin", "latex", "less",
                    "lisp", "makefile", "nginx", "opencl", "perl", "php", "properties", "python", "jsx", "tsx", "regex",
                    "robotframework", "ruby", "sass", "scss", "sql", "typescript", "vim", "wiki", "yaml"
                ],
                "plugins": ["line-numbers", 'line-highlight'],
                "theme": "okaidia",
                // "css": true
            }
        ]
    ],
    env: {
        production: {
            plugins: [
                ["transform-react-remove-prop-types", {
                    "mode": "remove",
                    "ignoreFilenames": ["node_modules"]
                }]
            ]
        },
        development: {
            plugins: [
                "react-hot-loader/babel",
            ]
        }
    }
}