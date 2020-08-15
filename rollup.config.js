import multi from '@rollup/plugin-multi-entry'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

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
  ],
  external: ['vue'],
}
