import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: {
    qs: 'src/index.js'
  },
  output: {
    dir: 'dist',
    format: 'umd',
    entryFileNames: '[name].js',
    name: 'qs',
    sourcemap: true,
    sourcemapFile: '[name].js.map',
    compact: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({ 
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
     }),
     terser()
  ]
}
