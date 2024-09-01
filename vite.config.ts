import eslint from '@rollup/plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import compressPlugin from 'vite-plugin-compression'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    {
      ...eslint({
        include: '**/*.+(vue|js|jsx|ts|tsx)',
      }),
      enforce: 'pre',
      apply: 'serve',
    },

    {
      ...compressPlugin({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      apply: 'build',
    },
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },

  server: {
    port: 8090,
  },
})
