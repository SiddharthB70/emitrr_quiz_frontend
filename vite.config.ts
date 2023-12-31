import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPlugin from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsConfigPlugin()],
    server: {
        port: 3000,
    },
});
