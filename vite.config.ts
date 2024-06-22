import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url))
      }
    ]
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/helper/vitest.helper.tsx"
  },
  server: {
    port: 3500,
  }
});