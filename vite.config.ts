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
        name: "ArkMd-App",
        short_name: "ArkMd",
        description: "A medical web app.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#3f51b5",
        icons: [
          { src: "arkmd-icon.png", sizes: "192x192", type: "image/png" },
          { src: "arkmd-icon.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
