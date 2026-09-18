import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), {
    name: 'archive-pages',
    writeBundle(options) {
      const outDir = options.dir ?? fileURLToPath(new URL('./dist', import.meta.url))
      const indexPath = path.join(outDir, 'index.html')
      const index = readFileSync(indexPath, 'utf8')
      const archiveIndex = index.replace('<head>', '<head><base href="../">')
      for (const page of ['experience', 'projects', 'coursework']) {
        const pageDir = path.join(outDir, page)
        mkdirSync(pageDir, { recursive: true })
        writeFileSync(path.join(pageDir, 'index.html'), archiveIndex)
      }
    },
  }],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
})
