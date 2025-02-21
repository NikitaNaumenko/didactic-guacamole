import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './vitest.setup.mjs',
//   },
// });

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    publicDir: false,
    build: {
      outDir: "../priv/static",
      emptyOutDir: false,
      target: ["es2020"],
      manifest: false,
      rollupOptions: {
        input: "./src/main.tsx",
        output: {
          assetFileNames: "assets/[name][extname]",
          chunkFileNames: "assets/[name].js",
          entryFileNames: "assets/[name].js",
        },
      },
      // commonjsOptions: {
      //   exclude: [],
      //   // include: ["vendor/topbar.js"],
      // },
    },
    css: {
      postcss: {
        // plugins: [tailwindcss, autoprefixer],
      },
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
