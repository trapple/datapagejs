import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const banner = `/*
 * datapage
 * Simple Pagination Data Object
 * https://github.com/trapple/datapagejs.git
 * Copyright 2013 trapple
 * Version: 1.3.4
 */`

export default [
  // UMD build
  {
    input: 'src/datapage.ts',
    output: {
      file: 'dist/datapage.js',
      format: 'umd',
      name: 'DataPage',
      banner
    },
    plugins: [typescript({ tsconfig: './tsconfig.json', declaration: false })]
  },
  // UMD minified build
  {
    input: 'src/datapage.ts',
    output: {
      file: 'dist/datapage.min.js',
      format: 'umd',
      name: 'DataPage',
      banner
    },
    plugins: [typescript({ tsconfig: './tsconfig.json', declaration: false }), terser()]
  },
  // ES Module build
  {
    input: 'src/datapage.ts',
    output: {
      file: 'dist/datapage.esm.js',
      format: 'es',
      banner
    },
    plugins: [typescript({ tsconfig: './tsconfig.json', declaration: false })]
  }
]