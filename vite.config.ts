import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({ minify: true, template: './src/index.html' }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/ts/components/testSetup.ts',
    },
});
