module.exports = {

    watch: true,
    entry: [
        __dirname + '/js/main.coffee'
    ],
    module: {
        loaders: [
            { test: /\.(coffee)$/, exclude: /node_modules/, loaders: ['coffee-loader'] },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/' }
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    resolve: {
        extensions: ['', '.js', '.coffee', '.es6', '.styl']
    }
};
