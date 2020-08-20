import multi from '@rollup/plugin-multi-entry'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/**/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.es.js',
      format: 'es',
    },
  ],
  plugins: [
    multi(),
    typescript({
      exclude: '**/*.spec.tsx',
      noEmitOnError: false,
    }),
    nodeResolve(),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'body-scroll-lock': ['enableBodyScroll', 'disableBodyScroll'],
      },
    }),
  ],
  external: ['vue'],
}
