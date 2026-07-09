import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/

console.log('VITE_API_URL at build time:', process.env.VITE_API_URL)

export default defineConfig({
  plugins: [react()],
  resolve: {
  alias: {
    "@":path.resolve(__dirname, 'src'),
  },
  },
});
