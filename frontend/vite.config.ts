import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
    plugins: [vue(), vuetify({ autoImport: true })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173
    }
});
