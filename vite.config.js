import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/datapage.js'),
      name: 'DataPage',
      fileName: (format) => `datapage.${format}.js`,
      formats: ['es', 'umd']
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        banner: `/*
 * datapage
 * Simple Pagination Data Object
 * https://github.com/trapple/datapagejs.git
 * Copyright 2013 trapple
 * Version: 1.3.4
 */`
      }
    }
  }
})