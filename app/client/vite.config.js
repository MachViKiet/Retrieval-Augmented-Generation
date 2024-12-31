import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars. !!! BUT DON'T REASSIGN it to process.env (notice `const loadedEnv =`) !!!
  const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr()],
    // base: './'
    __VALUE__: `"${process.env.VALUE}"`,
    resolve: {
      alias: [{ find: "~", replacement: "/src" }],
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8017', // Địa chỉ của API server
        changeOrigin: true,              // Thay đổi nguồn gốc của yêu cầu
        rewrite: (path) => path.replace(/^\/api/, ''), // Loại bỏ /api trước khi gửi yêu cầu đến API server
        secure: false,
        ws: false
      },
      '/socket': {
        target: 'ws://127.0.0.1:8017', // Địa chỉ của API server
        changeOrigin: true,              // Thay đổi nguồn gốc của yêu cầu
        ws: true,
        rewrite: (path) => path.replace(/^\/socket/, ''), // Loại bỏ /api trước khi gửi yêu cầu đến API server
      }
    },
    //change port for dev
    server: {
      watch: {
        usePolling: true,
      },
      proxy: {
        '/api': {
          target: 'https://127.0.0.1:8017', // Địa chỉ của API server
          changeOrigin: true,              // Thay đổi nguồn gốc của yêu cầu
          rewrite: (path) => path.replace(/^\/api/, ''), // Loại bỏ /api trước khi gửi yêu cầu đến API server
          secure: false,
          ws: false
        },
        '/socket': {
          target: 'ws://127.0.0.1:8017', // Địa chỉ của API server
          changeOrigin: true,              // Thay đổi nguồn gốc của yêu cầu
          ws: true,
          rewrite: (path) => path.replace(/^\/socket/, ''), // Loại bỏ /api trước khi gửi yêu cầu đến API server
        }
      },
      port: 3000,
      https: false,
      strictPort: true,
      host: true,
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
