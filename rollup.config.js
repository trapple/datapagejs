import terser from '@rollup/plugin-terser'

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
    input: 'src/datapage.js',
    output: {
      file: 'dist/datapage.js',
      format: 'umd',
      name: 'DataPage',
      banner
    }
  },
  // UMD minified build
  {
    input: 'src/datapage.js',
    output: {
      file: 'dist/datapage.min.js',
      format: 'umd',
      name: 'DataPage',
      banner
    },
    plugins: [terser()]
  },
  // ES Module build
  {
    input: 'src/datapage.js',
    output: {
      file: 'dist/datapage.esm.js',
      format: 'es',
      banner
    }
  }
]