import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
import fs from 'fs';
import path from "path";
import mkcert from 'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars. !!! BUT DON'T REASSIGN it to process.env (notice `const loadedEnv =`) !!!
  const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr() ],
    // base: './'
    __VALUE__: `"${process.env.VALUE}"`,
    resolve: {
      alias: [{ find: "~", replacement: "/src" }],
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
    // https: {
    //   key: fs.readFileSync(path.join(process.cwd(), './cert/client-key.pem')),
    //   cert: fs.readFileSync(path.join(process.cwd(), './cert/client-cert.pem'))
    // },
    //change port for dev
    server: {
      // https: true,
      https: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // Địa chỉ của API server
          // rewrite: (path) => path.replace(/^\/api/, ''), // Loại bỏ /api trước khi gửi yêu cầu đến API server
          secure: false,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },

        // '/socket.io': {
        //   target: 'ws://172.0.0.1:8017', // Địa chỉ của API server
        //   secure: false,
        //   changeOrigin: true,
        //   ws: true,
        // }
      },
      // port: 3000,
      // strictPort: true,
      host: '0.0.0.0',
    },
    //change port for production
    preview: {
      watch: {
        usePolling: true,
      },
      port: 3000,
      https: false,
      host: true,
      strictPort: true,
    },
  });
};
