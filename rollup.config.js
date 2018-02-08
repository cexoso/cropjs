import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

export default {
    input: './src/index.ts',
    format: 'iife',
    name: 'bundle.js',
    output: {
        file: 'npm_dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        typescriptPlugin({
            typescript
        }),
        postcss({
            extract: true
        }),
        uglify()
    ]
};
