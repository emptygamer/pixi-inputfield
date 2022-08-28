const path = require('path');

module.exports = {
    entry: './dist/tsjs/InputField.js',
    output: {
        library: 'PixiInputField',
        libraryTarget: 'umd',
        globalObject: 'this',
        filename:"pixi-input-field.js"
    },
    externals: {
        'pixi.js': 'PIXI',
    }
};