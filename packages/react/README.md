# OmniLumen React Hooks

React Hooks for Stellar functionalities such as accounts, wallets, contracts, transactions, signing, and more.

## Features

- **Account**: Manage Stellar accounts.
- **Balance**: Query account balances.
- **Block**: Handle block-related data.
- **Connector**: Integrate wallet connectors.
- **SendTxn**: Manage transactions.
- **SignTxn**: Sign transactions with connected wallets.
- others (operation, contract, etc)

## Installation

```bash
npm install @omnilumen/hooks @omnilumen/core stellar-sdk
```

## Simplified Setup and Configuration

OmniLumen offers simplified setup and configuration for different environments, utilizing React, Next.js, and Vite. The create-omnilumen package provides an easy way to bootstrap projects with pre-configured settings for React, Next.js.

## Usage

### Importing Hooks

```bash
import { useAccount } from '@omnilumen/hooks';

```

### Examples

index.tsx

```bash
import { useAccount } from '@omnilumen/hooks';

function App() {
  const account = useAccount();
  account.loadAccount(accountId);

  return (
    <div>
      <h1>Account: {account.id}</h1>
      <p>Balance: {account.balance}</p>
    </div>
  );
}
```

config.ts

```bash
import { http, createConfig } from '@omnilumen/core';
import { mainnet, testnet } from '@omnilumen/chains';

export const config = createConfig({
  chains: [mainnet, testnet],
  transports: {
    [mainnet.id]: http(),
    [testnet.id]: http(),
  },
});
```
