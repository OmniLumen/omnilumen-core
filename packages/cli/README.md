# @omnilumen/cli

Integrate Stellar CLI commands within OmniLumen to manage and deploy Soroban contracts, simplifying the command-line workflow for developers.

## Overview

OmniLumen CLI is a command-line interface for managing Rust, Soroban contracts, integrating Stellar CLI commands, and automating workflows for Stellar developers. It simplifies tasks such as deploying, invoking, and managing smart contracts on the Stellar network.

## Installation

```bash
npm install -g @omnilumen/cli
```

## Usage (OmniLumen Rust)

The omnilumen-rust-cli tool provides a simple way to manage the installation of Rust and Cargo, tailored for ease of use and flexibility. The following commands and options are available:

### OmniLumen Install Rust

```bash
omnilumen-rust-cli install [--global | --path <directory>]

--global: Install Rust globally.
--path <directory>: Install Rust in a specific directory.

```

### OmniLumen Uninstall Rust

```bash
omnilumen-rust-cli uninstall [--global | --path <directory>]

--global: Uninstall Rust globally.
--path <directory>: Uninstall Rust from a specific directory.

```

### OmniLumen Update Rust

```bash
omnilumen-rust-cli update --version <version> [--global | --path <directory>]

```

## Usage (OmniLumen Soroban)

OmniLumen CLI wraps around the Soroban CLI tool, providing easy-to-use commands for managing and deploying smart contracts.

### OmniLumen Deploy a Contract

```bash
omnilumen-soroban-cli deploy --wasm <WASM_FILE> --secret-key <SECRET_KEY> --rpc-url <RPC_URL> --network-passphrase <NETWORK_PASSPHRASE>
--wasm <WASM_FILE>: The path to the compiled WASM file of the contract.
--secret-key <SECRET_KEY>: The secret key for the account deploying the contract.
--rpc-url <RPC_URL>: The RPC URL of the Soroban network.
--network-passphrase <NETWORK_PASSPHRASE>: The network passphrase of the Soroban network.

```

Example:

```bash

 omnilumen-soroban-cli  contract deploy \
  --wasm target/wasm32-unknown-unknown/release/soroban_hello_world_contract.wasm \
  --source-account <SECRET_KEY> \
  --rpc-url https://soroban-rpc-url.com \
  --network-passphrase 'Public Global Stellar Network ; September 2015' 


omnilumen-soroban-cli contract deploy \
  --wasm target/wasm32-unknown-unknown/release/soroban_hello_world_contract.wasm \
  --source alice \
  --network testnet

```

### OmniLumen Invoke a Contract Function

```bash

omnilumen-soroban-cli invoke --id <CONTRACT_ID> --fn <FUNCTION> --secret-key <SECRET_KEY> --rpc-url <RPC_URL> --network-passphrase <NETWORK_PASSPHRASE> --args <ARGS>
--id <CONTRACT_ID>: The ID of the contract to invoke.
--fn <FUNCTION>: The name of the function to invoke.
--secret-key <SECRET_KEY>: The secret key for the account invoking the contract.
--rpc-url <RPC_URL>: The RPC URL of the Soroban network.
--network-passphrase <NETWORK_PASSPHRASE>: The network passphrase of the Soroban network.
--args <ARGS>: The arguments to pass to the contract function.

```

### OmniLumen Install a Contract

```bash
omnilumen-soroban-cli install --wasm <WASM_FILE> --secret-key <SECRET_KEY> --rpc-url <RPC_URL> --network-passphrase <NETWORK_PASSPHRASE>

--wasm <WASM_FILE>: The path to the compiled WASM file of the contract.
--secret-key <SECRET_KEY>: The secret key for the account installing the contract.
--rpc-url <RPC_URL>: The RPC URL of the Soroban network.
--network-passphrase <NETWORK_PASSPHRASE>: The network passphrase of the Soroban network.
```

### OmniLumen Inspect a Contract

```bash
omnilumen-soroban-cli inspect --wasm <WASM_FILE>

```

### OmniLumen Generate Contract Bindings

```bash
omnilumen-soroban-cli bindings --wasm <WASM_FILE> --output <OUTPUT_DIR>

```

### Check CLI Version

```bash
omnilumen-soroban-cli -V
```
