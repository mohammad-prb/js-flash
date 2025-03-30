import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [
        {
            name: 'css-as-string',
            setup(build) {
                build.onLoad({ filter: /\.css$/ }, (args) => {
                    const contents = readFileSync(args.path, 'utf8')
                    return {
                        contents: `export default ${JSON.stringify(contents)};`,
                        loader: 'js'
                    }
                })
            }
        },
        {
            name: 'svg-as-string',
            setup(build) {
                build.onLoad({ filter: /\.svg$/ }, (args) => {
                    const contents = readFileSync(args.path, 'utf8')
                    return {
                        contents: `export default ${JSON.stringify(contents)};`,
                        loader: 'js'
                    }
                })
            }
        }
    ]
})