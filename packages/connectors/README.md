# @omnilumen/connectors

A collection of connectors for OmniLumen, enabling seamless integration with Stellar and Soroban.

## Installation

```bash
npm install @omnilumen/connectors @omnilumen/core stellar-sdk
```

## Features

- **Pre-built connectors** for Stellar wallets like Freighter and others.
- **Easy integration** with Stellar and Soroban for account management and transactions.
- **Support for React hooks** to simplify development.
- **Tools for seamless data querying** and analysis using BigQuery.

## Usage

### Importing Connectors


```shell
import { FreighterConnector } from '@omnilumen/connectors'; 
import { useAccount } from '@omnilumen/core'; 
const connector = new FreighterConnector(); 
const { account, connect } = useAccount(connector); 
connect().then(() => {
    console.log(`Connected account: ${account.publicKey}`); 
});
```

### Connecting to a Wallet

```shell
import { FreighterConnector } from '@omnilumen/connectors'; 
const freighter = new FreighterConnector(); 
freighter.connect().then(account => { 
    console.log('Connected to Freighter wallet:', account.publicKey); 
});
```
