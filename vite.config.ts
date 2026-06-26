import path, { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

import fs from 'fs';
const { version } = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// ----------------------------------------------------------------------

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: '/',
    plugins: [
      react(),

      // Progressive Web App (PWA)
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifestFilename: 'manifest.webmanifest',
        workbox: {
          globPatterns: [],
          cleanupOutdatedCaches: true, // ลบ cache เก่าเมื่อ build ใหม่
          clientsClaim: true,          // ให้ SW ใหม่ทำงานทันที
          skipWaiting: true,           // ไม่รอ reload ครั้งถัดไป
        },
      }),

      // Type Checking + ESLint overlay
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        },
        overlay: { initialIsOpen: false },
      }),

      // Image Optimizer
      ViteImageOptimizer({
        png: { quality: 40 },
        jpeg: { quality: 40 },
        jpg: { quality: 40 },
        svg: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupNumericValues: false,
                  removeViewBox: false,
                },
              },
            },
            'sortAttrs',
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
              },
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'lodash',
        '@mui/material',
        '@mui/x-data-grid',
        '@mui/x-date-pickers',
        '@mui/lab',
        '@emotion/cache',
        '@emotion/react',
        '@emotion/styled',
        'react-router-dom',
        'axios',
        'framer-motion',
      ],
    },
    resolve: {
      alias: [
        { find: /^~(.+)/, replacement: path.join(process.cwd(), 'node_modules/$1') },
        { find: /^src(.+)/, replacement: path.join(process.cwd(), 'src/$1') },
      ],
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: false,
      outDir: 'dist',
      assetsInlineLimit: 4096,

      // เพิ่ม hashing ป้องกัน cache เก่า
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            mui: ['@mui/material', '@mui/x-data-grid', '@mui/x-date-pickers', '@mui/lab'],
            vendor: ['axios', 'lodash', 'framer-motion'],
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    define: {
      // inject version เข้าไปใน code
      __APP_VERSION__: JSON.stringify(version),
    },
    server: { port: 8080 },
    preview: { port: 3500 },
  };
});