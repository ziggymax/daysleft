import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  publicDir: false,
  build: {
    // Output a single, self-contained index.html next to the app/ folder.
    outDir: '..',
    emptyOutDir: false,
  },
})
