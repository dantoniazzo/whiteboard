import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      // Add any aliases you need here
      _app: path.resolve(__dirname, "src/_app/"),
      _pages: path.resolve(__dirname, "src/_pages/"),
      _features: path.resolve(__dirname, "src/_features/"),
      _shared: path.resolve(__dirname, "src/_shared/"),
      _widgets: path.resolve(__dirname, "src/_widgets/"),
    },
  },
});
