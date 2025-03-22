import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
	css: {
		modules: {
			localsConvention: "camelCaseOnly"
		},
		postcss: {
			plugins: [tailwindcss, autoprefixer]
		}
	},
	assetsInclude: ['**/*.mp3']  // Add this line to include audio files
});
