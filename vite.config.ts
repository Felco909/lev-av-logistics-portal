import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  // GitHub Pages serves this repo as a project site under /lev-av-logistics-portal/,
  // so that build still needs the subpath prefix — this is the default and what the
  // existing GitHub Actions workflow produces (it never sets DEPLOY_TARGET).
  // Cloudflare Pages serves the same repo from the domain root, so its build sets
  // DEPLOY_TARGET=cloudflare (via a Cloudflare project environment variable) to get
  // base '/' instead. Keeping this as one parameterized config — rather than forking
  // vite.config.ts per host — means both deployments always build from the exact same
  // source. The dev server always stays at root regardless of target.
  const base =
    command === 'build'
      ? process.env.DEPLOY_TARGET === 'cloudflare'
        ? '/'
        : '/lev-av-logistics-portal/'
      : '/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
