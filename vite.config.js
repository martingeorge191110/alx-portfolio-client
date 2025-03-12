import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Move dependencies to a separate "vendor" chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 800, // Optional: Increase limit (default is 500)
  },
})
