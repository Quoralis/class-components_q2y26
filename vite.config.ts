import { defineConfig } from "vitest/config"
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx() },
    react({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
      exclude: [/\/pdf\//, /\.solid\.tsx$/, /\/node_modules\//],
    }),
    babel({
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
        '**/*.module.css',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      reporter: ['text', 'json', 'html']
    },
  },
});
