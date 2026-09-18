import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      workbox: {
        // Precache the ARTWORK too, not just the code. Workbox's default glob
        // only picks up js/css/html, which left all 38 pony sprites and 16
        // backgrounds (~19 MB) uncached — the game ran offline but every pony
        // and every scene failed to load. This is what makes it playable on a
        // plane. The whole bundle is fetched when the service worker installs,
        // so the app must be opened once ON WIFI after deploying.
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,webmanifest}'],
        // Largest sprite is ~535 KB today; the default cap is 2 MiB. Headroom
        // so a bigger piece of art can never silently drop out of the bundle.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      },
      manifest: {
        name: "Evelyn's Unicorn Adventure",
        short_name: 'Unicorn RPG',
        description: 'Collect and battle unicorns across a magical world!',
        theme_color: '#7c3aed',
        background_color: '#1e1033',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
