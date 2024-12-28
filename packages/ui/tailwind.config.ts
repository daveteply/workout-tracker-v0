import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';
import daisyui from 'daisyui';

const config: Pick<Config, 'prefix' | 'presets' | 'content' | 'plugins'> = {
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig],
  plugins: [daisyui],
};

export default config;
