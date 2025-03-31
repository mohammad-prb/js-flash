import {defineConfig} from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts', // Your main entry file
            name: 'Flash', // Global variable name (if used in browser)
            fileName: 'index', // Output file name (index.js, index.umd.js, etc.)
            formats: ['es', 'umd'], // ES Modules + UMD for wider compatibility
        },
        rollupOptions: {
            external: [], // Mark external dependencies (like React, if any)
            output: {
                globals: {}, // Define global variables for UMD build
            },
        },
    },
    plugins: [
        cssInjectedByJsPlugin(), // Injects CSS automatically
    ],
    assetsInclude: ['**/*.svg']  // This tells Vite to treat SVGs as assets
});