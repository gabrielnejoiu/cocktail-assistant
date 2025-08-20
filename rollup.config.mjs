
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { copy } from '@web/rollup-plugin-copy';

export default {
    input: 'index.html',
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        nodeResolve(),
        html({
            input: 'index.html',
            extractAssets: true
        }),
        copy({
            patterns: [
                'src/**/*.css',
                'screenshot.png'
            ]
        })
    ],
    preserveEntrySignatures: false
};