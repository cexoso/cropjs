import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';

export default {
    input: './src/index.ts',
    output: {
        file: 'index.js',
        format: 'umd',
        name: 'cropper',
        sourcemap: true
    },
    plugins: [
        common(),
        resolve({}),
        typescriptPlugin({
            typescript,
            target: 'ES5',
            importHelpers: true,
            sourceMap: true,
            inlineSourceMap: false,
            inlineSources: false
        }),
        postcss(),
        uglify()
    ],
    watch: {
        chokidar: true,
        exclude: ['node_modules/**']
    }
};
