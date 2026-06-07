import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// https://vite.dev/config/
export default defineConfig({
   server: {
    host: "0.0.0.0",
    port: 5174,
    // allowedHosts: "all",
    allowedHosts:true,
  },
  plugins: [
    react(),
   
    tailwindcss(),
    tsconfigPaths() // This allows Vite to see your "paths" and "baseUrl"
  ],
})





