import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "ArkMd",
        short_name: "ArkMd",
        description: "A medical co-pilot.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffde59",
        icons: [
          { src: "./src/assets/arkmd-icon.png", sizes: "192x192", type: "image/png" },
          { src: "./src/assets/arkmd-icon.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
