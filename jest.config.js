import { pathsToModuleNameMapper } from "ts-jest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { compilerOptions } = require("./tsconfig.json");

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      { useESM: true, tsconfig: "tsconfig.jest.json" },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(jose|next-auth|openid-client|next-intl|use-intl|@panva/hkdf|preact-render-to-string|preact)/)",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
