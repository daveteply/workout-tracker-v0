import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import daisyui from "daisyui";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: ["./app/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [daisyui],
};

export default config;
