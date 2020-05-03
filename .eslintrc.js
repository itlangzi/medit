module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            ecmaVersion: 6,
            requireConfigFile: true,
            jsx: true
        }
    },
    parser: 'babel-eslint',
    plugins: [
        // eslint-plugin-import
        // extends:
        // - eslint:recommended
        // - plugin:import/errors
        // - plugin:import/warnings
        'import',

        // extends:
        // - plugin:flowtype/recommended
        'flowtype',

        // extends:
        // - plugin:jsx-a11y/recommended
        // - plugin:jsx-a11y/strict 
        'jsx-a11y',

        // extends:
        // - plugin:react/recommended
        // - plugin:react/all
        'react',

        'react-hooks'
    ],
    /* overrides: [
        { parser: 'babel-eslint' }
    ], */
    env: {
        browser: true,
        node: true,
        es6: true,
        amd: true
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    /* , 'prettier/react' *//* , 'prettier' */
    extends: ['eslint:recommended', 'plugin:react/all'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['warn', 4, { 'SwitchCase': 1 }],
        'no-param-reassign': 'off',
        'max-len': 'off',
        'semi': 'off',
        'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
        'no-case-declarations': 'off',

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules
        'react/no-multi-comp': 'off',
        'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
        'react/prefer-es6-class': ['error', 'always'],
        'react/jsx-one-expression-per-line': ['off'],
        'react/jsx-filename-extension': ['warn', { extensions: [".js", ".jsx"] }],
        'react/jsx-no-literals': 'off',
        'react/prop-types': ['warn', { ignore: ['children'], skipUndeclared: true }],
        'react/destructuring-assignment': 'off',//['off', 'always', { ignoreClassFields: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-max-depth': 'off',
        'react/no-set-state': 'off',
        'react/jsx-no-bind': 'off',
        'react/display-name': 'off',
        'react/jsx-child-element-spacing': 'off',
        'react/jsx-max-props-per-line': ['warn', { maximum: 5 }],
        'react/jsx-sort-props': 'off',//['error', { callbacksLast: true, shorthandFirst: true, reservedFirst: true }],
        'react/no-children-prop': 'off',
        'react/forbid-component-props': 'off',
        'react/jsx-handler-names': ['warn', { eventHandlerPrefix: 'on', eventHandlerPropPrefix: 'on' }],
        'react/forbid-prop-types': 'off',
        'react/require-optimization': ['error', { allowDecorators: ['shouldComponentUpdate', 'pureRender'] }],
        'react/function-component-definition': 'off',
        'react/no-danger': 'off',
    }
};
