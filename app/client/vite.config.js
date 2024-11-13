import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// https://vitejs.dev/config/
export default () => {

  return defineConfig({
    plugins: [react(), svgr()],
    __VALUE__: `"${process.env.VALUE}"`,
    resolve: {
      alias: [{ find: "~", replacement: "/src" }],
    },
  });
};
