import {defineConfig} from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts', // Your main entry file
            name: 'Flash', // Global variable name (if used in browser)
            fileName: (format) => format === 'umd' ? 'index.umd.js' : 'index.js',
            formats: ['es', 'umd'], // ES Modules + UMD for wider compatibility
        },
        rollupOptions: {
            external: [], // Mark external dependencies (like React, if any)
            output: {
                assetFileNames: 'assets/[name][extname]', // Preserve CSS file name
                globals: {}, // Define global variables for UMD build
            },
        },
        sourcemap: true,
        cssCodeSplit: false, // Force CSS into JS
    },
    plugins: [
        cssInjectedByJsPlugin(), // Injects CSS automatically
        dts(), // Generates .d.ts files
    ],
    assetsInclude: ['**/*.svg'],  // This tells Vite to treat SVGs as assets
});