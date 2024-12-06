import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite(), react()],
  build: {
    outDir: resolve(__dirname, '..', 'dist', 'web'),
    emptyOutDir: true,
  },
	resolve: {
		alias: [
			{
				find: "@src",
				replacement: fileURLToPath(new URL("./src", import.meta.url)),
			},
			{
				find: "@server",
				replacement: fileURLToPath(new URL("../server", import.meta.url)),
			},
		],
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
		},
	},
});
