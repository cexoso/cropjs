import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';

export default {
    input: './src/index.ts',
    format: 'iife',
    name: 'bundle.js',
    plugins: [
        typescriptPlugin({
            typescript
        })
    ]
};
