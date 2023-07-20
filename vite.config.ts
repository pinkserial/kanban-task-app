import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      {
        find: "@icons",
        replacement: fileURLToPath(
          new URL("./src/components/icons", import.meta.url)
        ),
      },
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "@hooks",
        replacement: fileURLToPath(new URL("./src/hooks", import.meta.url)),
      },
    ],
  },
  plugins: [react(), svgr()],
});
