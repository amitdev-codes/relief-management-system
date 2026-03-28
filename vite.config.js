import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/css/global.scss",
                "resources/js/app.jsx",
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
            "@admin": path.resolve(__dirname, "resources/js/admin"), // Resolve path for admin
            "@user": path.resolve(__dirname, "resources/js/user"),
        },
    },
    server: {
        hmr: {
            overlay: false,
        },
    },
});
