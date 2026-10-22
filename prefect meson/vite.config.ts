import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { cpSync, mkdirSync, existsSync } from 'fs';

const assetsPlugin = () => {
  return {
    name: 'assets-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/')) {
          req.url = '/src' + req.url;
        }
        next();
      });
    },
    closeBundle() {
      const srcDir = resolve(__dirname, 'src/assets');
      const destDir = resolve(__dirname, 'dist/assets');
      if (existsSync(srcDir)) {
        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true });
        }
        cpSync(srcDir, destDir, { recursive: true, force: true });
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), assetsPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    watch: {
      ignored: [
        '**/PERFECT/**',
        '**/FRAMES/**',
        '**/public/frames/**',
        '**/pavan/**',
        '**/smitha/**',
        '**/public/pavan/**',
        '**/public/smitha/**',
        '**/.git/**',
        '**/dist/**',
      ],
    },
  },
});
