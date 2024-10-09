import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@root': path.resolve(__dirname, 'src/root'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			
		},
	},
});
