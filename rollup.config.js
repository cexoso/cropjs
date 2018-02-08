import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import uglify from 'rollup-plugin-uglify';

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
        uglify()
    ]
};
