import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const banner = `/*
 * datapage
 * Simple Pagination Data Object
 * https://github.com/trapple/datapagejs.git
 * Copyright 2013 trapple
 * Version: 2.0.0
 */`

export default [
  // CommonJS build (for Node.js)
  {
    input: 'src/datapage.ts',
    output: {
      file: 'dist/datapage.cjs',
      format: 'cjs',
      banner,
      sourcemap: true,
      exports: 'default',
      interop: 'auto'
    },
    plugins: [
      typescript({ 
        tsconfig: './tsconfig.json', 
        declaration: false,
        declarationMap: false,
        sourceMap: true
      })
    ]
  },
  // UMD build
  {
    input: 'src/datapage.ts',
    output: {
      file: 'dist/datapage.js',
      format: 'umd',
      name: 'DataPage',
      banner,
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      typescript({ 
        tsconfig: './tsconfig.json', 
        declaration: false,
        declarationMap: false,
        sourceMap: true
      })
    ],
    context: 'this'
  },
  // UMD minified build
  {
    input: 'src/datapage.ts',
    output: {
      file: 'dist/datapage.min.js',
      format: 'umd',
      name: 'DataPage',
      banner,
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      typescript({ 
        tsconfig: './tsconfig.json', 
        declaration: false,
        declarationMap: false,
        sourceMap: true
      }), 
      terser({
        format: {
          comments: function(node, comment) {
            return comment.value.includes('datapage');
          }
        }
      })
    ],
    context: 'this'
  },
  // ES Module build
  {
    input: 'src/datapage.ts',
    output: {
      file: 'dist/datapage.esm.js',
      format: 'es',
      banner,
      sourcemap: true
    },
    plugins: [
      typescript({ 
        tsconfig: './tsconfig.json', 
        declaration: false,
        declarationMap: false,
        sourceMap: true
      })
    ]
  }
]