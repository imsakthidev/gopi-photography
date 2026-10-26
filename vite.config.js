import { resolve } from 'path';
import { defineConfig } from 'vite';

const rootDir = typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : process.cwd();

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        portfolio: resolve(rootDir, 'portfolio.html'),
        packages: resolve(rootDir, 'packages.html'),
        about: resolve(rootDir, 'about.html'),
        contact: resolve(rootDir, 'contact.html')
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    }
  }
});
