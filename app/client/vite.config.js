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
    //change port for dev
    server: {
      port: 3006,
    },
    //change port for production
    preview: {
      port: 80,
    },
  });
};
