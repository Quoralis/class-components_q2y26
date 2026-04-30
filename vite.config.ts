import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
      exclude: [/\/pdf\//, /\.solid\.tsx$/, /\/node_modules\//],
    }),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
});