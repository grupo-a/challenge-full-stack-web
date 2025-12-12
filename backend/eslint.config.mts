import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import type { Linter } from "eslint";

const config: Linter.FlatConfig[] = [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: "off",
      quotes: ["error", "single"],
    },
  },
];

export default config;
