### @omnilumen/analytics

A suite of analytics tools for monitoring and analyzing Stellar network activity and performance.

## Installation

```bash
npm install @omnilumen/analytics
```
{
  "name": "@omnilumen/cli",
  "version": "1.0.0",
  "description": "Integrate Stellar CLI commands within OmniLumen to manage and deploy Soroban contracts, simplifying the command-line workflow for developers.",
  "main": "index.js",
  "bin": {
    "omnilumen-cli": "./bin/cli.js"
  },
  "scripts": {
    "start": "node ./bin/cli.js",
    "build": "tsc",
    "lint": "eslint .",
    "test": "jest"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/OmniLumen/omnilumen-core.git"
  },
  "keywords": [
    "stellar",
    "blockchain",
    "cli",
    "command-line",
    "soroban",
    "omnilumen"
  ],
  "author": "Your Name",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/OmniLumen/cli/issues"
  },
  "homepage": "https://github.com/OmniLumen/cli#readme",
  "dependencies": {
    "stellar-sdk": "^8.2.0",
    "commander": "^9.0.0",
    "inquirer": "^8.0.0",
    "@omnilumen/core": "^1.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "typescript": "^4.0.0",
    "@types/node": "^18.0.0",
    "@types/commander": "^9.0.0",
    "@types/inquirer": "^8.0.0",
    "ts-jest": "^29.0.0",
    "ts-node": "^10.0.0"
  }
}
