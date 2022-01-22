import multi from '@rollup/plugin-multi-entry'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

export default [
  {
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
      del({ targets: 'lib/*' }),
      multi(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
    ],
    external: ['vue'],
  },
  {
    input: './lib/dts/**/*.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [multi(), dts(), del({ targets: 'lib/dts', hook: 'buildEnd' })],
  },
]
