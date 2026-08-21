# Glob pattern for semver

**TL;DR**: here is the glob pattern: `@(0|[1-9]*([0-9])).@(0|[1-9]*([0-9])).@(0|[1-9]*([0-9]))?(-@(*([0-9])[a-zA-Z-]*([a-zA-Z0-9-])|0|[1-9]*([0-9]))*(.@(*([0-9])[a-zA-Z-]*([a-zA-Z0-9-])|0|[1-9]*([0-9]))))?(++([a-zA-Z0-9-])*(.+([a-zA-Z0-9-])))`

This project detects versions following [SemVer 2.0](https://semver.org/). The generator is based on the [Backus–Naur form grammar](https://semver.org/#backusnaur-form-grammar-for-valid-semver-versions) defined by SemVer 2.0.

## Getting Started

In order to test locally, run the following commands:

```bash
npm install
npm test
npm run generate
```

`npm test` checks the generated pattern against the SemVer valid and invalid test vectors. `npm run generate` prints the pattern and its length. The current pattern is _204 characters_ long.
