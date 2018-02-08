import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';

export default {
    input: './src/index.ts',
    name: 'cropper',
    output: {
        file: 'index.js',
        format: 'iife'
    },
    plugins: [
        typescriptPlugin({
            typescript
        }),
        postcss(),
        uglify(),
        resolve({}),
        common()
    ]
};
