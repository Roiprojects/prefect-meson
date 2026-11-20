import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { cpSync, mkdirSync, existsSync } from 'fs';
import dotenv from 'dotenv';

// Pre-load .env files to guarantee environment availability across all runners
dotenv.config();
dotenv.config({ path: resolve(__dirname, '.env') });
dotenv.config({ path: resolve(__dirname, '../.env') });

const assetsPlugin = () => {
  return {
    name: 'assets-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
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
export default defineConfig(({ mode }) => {
  // Load environment variables based on current mode & working directory
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), ''),
    ...loadEnv(mode, __dirname, ''),
  };

  // 1. Port numbers for proxy managed ONLY and strictly by .env
  const proxyPort = env.PROXY_PORT || env.PORT || env.BACKEND_PORT || env.VITE_BACKEND_PORT || '5000';
  const proxyHost = env.PROXY_HOST || env.BACKEND_HOST || '127.0.0.1';
  const proxyProtocol = env.PROXY_PROTOCOL || 'http';
  const proxyTarget = env.PROXY_TARGET || `${proxyProtocol}://${proxyHost}:${proxyPort}`;

  // Dev server port managed via .env
  const clientPort = parseInt(env.VITE_PORT || env.CLIENT_PORT || '3000', 10);

  // 3. Allowed Hosts mapping with .env to prevent "Blocked request: host is not allowed"
  // Defaults to true (permits all domains/tunnels) unless explicit comma-separated hosts provided in .env
  const allowedHostsEnv = env.ALLOWED_HOSTS || env.VITE_ALLOWED_HOSTS;
  const allowedHosts: boolean | string[] = allowedHostsEnv
    ? (allowedHostsEnv === 'true' || allowedHostsEnv === '*' ? true : allowedHostsEnv.split(',').map((h) => h.trim()))
    : true;

  console.log(`[Vite Config] Proxy target dynamically mapped from .env: ${proxyTarget}`);
  console.log(`[Vite Config] Server allowedHosts:`, allowedHosts === true ? 'ALL (wildcard enabled)' : allowedHosts);

  return {
    base: '/',
    plugins: [react(), assetsPlugin()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
    },
    server: {
      port: clientPort,
      open: false,
      host: true, // Listen on all network addresses (0.0.0.0)
      allowedHosts: allowedHosts,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
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
    preview: {
      port: clientPort,
      host: true,
      allowedHosts: allowedHosts,
    },
  };
});
