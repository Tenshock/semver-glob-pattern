import { generateValidSemVer } from "./semver-glob-generator.js";

const pattern = generateValidSemVer();
console.log("validSemVer:\n", pattern);
console.log("length: ", pattern.length);
