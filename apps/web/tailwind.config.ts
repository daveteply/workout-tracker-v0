import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import sharedConfig from '@repo/tailwind-config';
import daisyui from 'daisyui';

const config: Pick<Config, 'content' | 'presets' | 'plugins'> = {
  content: ['./app/**/*.tsx'],
  presets: [sharedConfig],
  plugins: [typography, forms, daisyui],
};

export default config;
