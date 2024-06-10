import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@@": resolve(__dirname, "./src/components"),
      "@": resolve(__dirname, "./src"),
      "#root/*": resolve(__dirname),
      "@shared/*": resolve(__dirname, "../shared"),
    },
  },
});
