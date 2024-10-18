import path from "path";
import react from "@vitejs/plugin-react-swc";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: '',
  plugins: [
    react(),
    Unfonts({
      custom: {
        // display: 'swap',
        families: {
          Geist: {
            src: "./assets/fonts/Geist*.woff2",
            // transform(font) {
            //   if (font.basename === 'DancingScript-Bold')
            //     font.weight = 700

            //   return font
            // },
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // base: "/",
  // server: {
  //   host: "0.0.0.0",
  //   watch: {
  //     usePolling: true,
  //   },
  //   hmr: { host: "0.0.0.0" },
  // },
});
