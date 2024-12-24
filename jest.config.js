import { pathsToModuleNameMapper } from "ts-jest";
import fs from "fs";

const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf-8"));

export default {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
