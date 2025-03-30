import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [
        {
            name: 'css-loader',
            setup(build) {
                build.onLoad({ filter: /\.css$/ }, async (args) => {
                    return {
                        contents: `export default ${JSON.stringify(
                            await require('fs').promises.readFile(args.path, 'utf8')
                        )};`,
                        loader: 'js'
                    }
                })
            }
        },
        {
            name: 'svg-loader',
            setup(build) {
                build.onLoad({ filter: /\.svg$/ }, async (args) => {
                    const content = await require('fs').promises.readFile(args.path, 'utf8')
                    return {
                        contents: `export default ${JSON.stringify(content)};`,
                        loader: 'js'
                    }
                })
            }
        }
    ]
})